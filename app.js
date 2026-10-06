'use strict';
// Wordlist Builder: theme tree and wordlists for Word Safari.
// The project lives in IndexedDB (autosaved) and in project files. Both use
// the compact format from serialize(): words point at themes by index.

const VERSION = '19';  // must match data-v and the ?v= links in index.html
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = t => t.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_|_$/g, '').toLowerCase();
const core = t => t.replace(/[ \-'’]/g, '');  // what counts towards length: letters, digits, &
// The form of a word to show and export, following the spelling setting.
const form = w => SET.spelling === 'UK' && w.uk ? w.uk : w.t;
// The form shown within a theme: some words are written differently per theme (Mercury the planet, mercury the metal).
function formIn(w, themeId) {
  if (w.tf && themeId) {
    if (w.tf[themeId]) return w.tf[themeId];
    for (const t of w.th) if (w.tf[t] && poolOwners(t).includes(themeId)) return w.tf[t];
  }
  return form(w);
}
// Balloon text: accents and special letters replaced by plain ones (crème brûlée -> creme brulee).
const PLAIN = { 'ı': 'i', 'İ': 'I', 'ß': 'ss', 'ø': 'o', 'Ø': 'O', 'æ': 'ae', 'Æ': 'AE', 'œ': 'oe', 'Œ': 'OE', 'ł': 'l', 'Ł': 'L', 'đ': 'd', 'Đ': 'D', 'ð': 'd', 'þ': 'th', '’': "'" };
const plain = t => t.replace(/[ıİßøØæÆœŒłŁđĐðþ’]/g, c => PLAIN[c]).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
const matches = (w, q) => w.t.toLowerCase().includes(q) || (!!w.uk && w.uk.toLowerCase().includes(q));

const KINDS = { '': 'category', place: 'place', property: 'property', wordplay: 'wordplay' };
const KIND_HELP = {
  '': 'Kinds of something: fruits, dog breeds',
  place: 'Things found at a place: beach, hospital',
  property: 'Things sharing a property: red things, things with wings',
  wordplay: 'Linked by spelling or sound: ___ball, hidden words',
};
// Regions for the journey's acts: 1 Turkey / Middle East / Africa, 2 Asia, 3 Oceania, 4 Antarctica,
// 5 South America, 6 North America, 7 Europe / Turkey. Turkey counts as Middle East.
const REGIONS = ['', 'Africa', 'Middle East', 'Asia', 'Oceania', 'Antarctica', 'South America', 'North America', 'Europe'];
const MODELS = [['claude-opus-5-5', 'Claude Opus 5.5'], ['claude-sonnet-5-5', 'Claude Sonnet 5.5'], ['claude-haiku-4-5', 'Claude Haiku 4.5']];
const SRC = { llm: 'L', manual: 'M', wikidata: 'W', conceptnet: 'C', datamuse: 'D' };
const SRC_NAME = Object.fromEntries(Object.entries(SRC).map(([k, v]) => [v, k]));

// ---------- state ----------

// Project: themes in display order, words keyed by slug of their text.
// theme: {id, name, label, parent, group, kind, region, d, note, adult, sep}
//   sep: the theme's words do not count as members of its parent (apple varieties are not fruits on their own)
// word:  {t (American spelling, capitals kept for proper nouns), uk (British spelling when different),
//         th: [themeId], on, z (Zipf, null = rarer than the list, undefined = not looked up), d (null = auto), src: [code], note,
//         x: [themeId] clashes (a player could think it fits; never in a level with these), ck: checked by the theme check,
//         sg: {themeId: 'c' | 'a'} suggestions from the check awaiting review (clear fit / arguable)}
let P = { themes: [], words: {} };
const UI = loadLocal('wlb-ui', { sel: null, exp: {}, sort: 't', dir: 1, sub: true, show: 'all', unlock: false });
const FLT = { len: true, min: 3, max: 20, maxMulti: 20, letters: true, multi: false, block: false, list: '' };
const SET = loadLocal('wlb-settings', { model: MODELS[0][0], spelling: 'US', key: '', remember: false, flt: {} });
if (SET.flt.maxMulti === undefined) SET.flt = { ...FLT, ...SET.flt, multi: false }; // older settings blocked all multi-word entries
if (!SET.flt.v2) SET.flt = { ...SET.flt, max: Math.max(SET.flt.max, 20), v2: true }; // single words up to 20 letters (was 12)
let sessionKey = SET.remember ? SET.key : '';
let limit = 500;
const PICK = new Set();   // ids of words ticked in the list
let lastPick = null;      // for shift-click ranges
let undoSnap = null;      // {data, label} saved before deletes

function loadLocal(k, def) {
  try { const j = localStorage.getItem(k); if (j) return Object.assign(def, JSON.parse(j)); } catch (e) { }
  return def;
}
function saveLocal() {
  try {
    localStorage.setItem('wlb-ui', JSON.stringify(UI));
    localStorage.setItem('wlb-settings', JSON.stringify({ ...SET, key: SET.remember ? sessionKey : '' }));
  } catch (e) { }
}

// ---------- indexes ----------

let IX = null;
function ix() {
  if (IX) return IX;
  const byId = {}, kids = { '': [] };
  for (const t of P.themes) { byId[t.id] = t; (kids[t.parent || ''] ||= []).push(t.id); }
  const anc = {};
  for (const t of P.themes) {
    const a = []; let p = t.id, n = 0;
    while (p && byId[p] && n++ < 50) { a.push(p); p = byId[p].parent; }
    anc[t.id] = a;
  }
  return IX = { byId, kids, anc };
}
const changed = () => { IX = null; counts = null; scheduleSave(); };
const theme = id => ix().byId[id];
const kidsOf = id => ix().kids[id || ''] || [];
function desc(id) {
  const out = new Set([id]), st = [id];
  while (st.length) for (const k of kidsOf(st.pop())) if (!out.has(k)) { out.add(k); st.push(k); }
  return out;
}
// A theme's word pool: itself plus sub-themes, except those marked sep (and everything under them).
function pool(id) {
  const out = new Set([id]), st = [id];
  while (st.length) for (const k of kidsOf(st.pop())) if (!out.has(k) && !theme(k).sep) { out.add(k); st.push(k); }
  return out;
}
// Themes whose pools contain theme t: t and its ancestors, stopping above a sep theme.
function poolOwners(t) {
  const out = [];
  for (const a of ix().anc[t] || []) { out.push(a); if (theme(a).sep) break; }
  return out;
}
const pathOf = id => ix().anc[id] ? ix().anc[id].slice().reverse().map(i => theme(i).name).join(' > ') : '';
const depth = id => Math.max(1, (ix().anc[id] || []).filter(i => !theme(i).group).length);
const themeDiff = id => theme(id).d || Math.min(5, depth(id));

let counts = null;
function getCounts() {
  if (counts) return counts;
  counts = {};
  for (const w of Object.values(P.words)) {
    const seen = new Set();
    for (const t of w.th) for (const a of poolOwners(t)) seen.add(a);
    for (const a of seen) { const c = counts[a] ||= { n: 0, on: 0 }; c.n++; if (w.on) c.on++; }
  }
  return counts;
}

// ---------- frequency ----------

// data/freq-en.txt: lines of "<zipf*10> word word ...", built by tools/build_freq.py from wordfreq.
let FREQ = null;
async function loadFreq() {
  try {
    const r = await fetch('data/freq-en.txt');
    if (!r.ok) throw Error(r.status);
    const m = new Map();
    for (const line of (await r.text()).split('\n')) {
      const parts = line.split(' '), z = +parts[0] / 10;
      for (let i = 1; i < parts.length; i++) m.set(parts[i], z);
    }
    FREQ = m;
    let n = 0;
    for (const w of Object.values(P.words)) if (w.z === undefined) { w.z = wordZipf(w); n++; }
    if (n) changed();
    render();
  } catch (e) {
    status('Frequency list not loaded (' + e.message + '). Open the app from a web server, e.g. GitHub Pages.', true);
  }
}
// Zipf of a word or phrase. Phrases combine like wordfreq does: 1/f = sum of 1/f_i.
function zipf(t) {
  if (!FREQ) return undefined;
  const parts = t.toLowerCase().split(/[ -]+/).filter(Boolean);
  let inv = 0;
  for (const p of parts) {
    const z = FREQ.get(p);
    if (z === undefined) return null;
    inv += 1 / Math.pow(10, z - 9);
  }
  return parts.length ? Math.round((Math.log10(1 / inv) + 9) * 10) / 10 : null;
}
// Default difficulty from frequency. Tune the cut points as the game is tested.
function autoDiff(z) {
  if (z == null) return 5;
  return z >= 4.8 ? 1 : z >= 4.0 ? 2 : z >= 3.3 ? 3 : z >= 2.6 ? 4 : 5;
}
// Familiarity (1 very well known .. 5 obscure) of a word as a member of a theme, if rated.
// Without a theme: the easiest of its ratings.
function famOf(w, themeId) {
  if (!w.fam) return null;
  if (themeId && w.fam[themeId]) return w.fam[themeId];
  const v = Object.values(w.fam);
  return v.length ? Math.min(...v) : null;
}
// Difficulty 1..5: set by hand, else familiarity in the theme, else from frequency.
const wordDiff = (w, themeId) => w.d || famOf(w, themeId) || autoDiff(w.z);
// Zipf of a word: the higher of its two spellings (wordfreq counts colour and color separately).
// Words missing from the list fall back to an estimate (w.ze) when one was given.
function wordZipf(w) {
  const a = zipf(w.t), b = w.uk ? zipf(w.uk) : null;
  if (a === undefined) return undefined;
  // Names of two or more words: combining the parts' frequencies overrates names made of common words
  // (star apple, rose apple), so use the estimate for the whole name when there is one.
  if (/[ -]/.test(w.t) && w.ze) return w.ze;
  const z = a == null ? b : b == null ? a : Math.max(a, b);
  return z == null && w.ze ? w.ze : z;
}
const zipfEstimated = w => !!w.ze && w.z === w.ze && (zipf(w.t) == null || /[ -]/.test(w.t));
// A theme is family-friendly unless it or a parent is marked adult.
const themeAdult = id => (ix().anc[id] || []).some(a => theme(a).adult);

// ---------- words ----------

function filterReason(t) {
  const f = SET.flt, c = core(t), parts = t.split(/[ -]+/);
  if (f.letters && !/^[\p{L}\p{N}&]+$/u.test(c)) return 'characters';
  if (parts.length > 1) {
    if (f.multi) return 'multi-word';
    if (parts.length > 2) return 'more than two words';
    if (f.len && (c.length > f.maxMulti || parts.some(p => p.length > f.max))) return 'length';
  }
  if (f.len && (c.length < f.min || (parts.length === 1 && c.length > f.max))) return 'length';
  if (f.block) {
    const bl = new Set(f.list.toLowerCase().split(/[\s,]+/).filter(Boolean));
    if (t.split(/[ -]/).some(x => bl.has(x))) return 'blocklist';
  }
  return '';
}
const clean = s => String(s || '').trim().replace(/\s+/g, ' ');
// Finds a word by either spelling.
function findWord(text) {
  const k = slug(text);
  if (P.words[k]) return P.words[k];
  return Object.values(P.words).find(w => w.uk && slug(w.uk) === k);
}
// Adds words to a theme. Items are strings or {word, uk, familiarity}. Returns how many were new to the project.
function addWords(list, src, themeId) {
  let n = 0;
  for (const item of list) {
    const t = clean(typeof item === 'string' ? item : item.word), uk = clean(typeof item === 'string' ? '' : item.uk);
    if (!t || t.length > 40 || !slug(t)) continue;
    let w = findWord(t) || (uk && findWord(uk));
    if (!w) {
      const r = filterReason(t);
      w = P.words[slug(t)] = { t, uk: uk && uk.toLowerCase() !== t.toLowerCase() ? uk : '', th: [], on: !r, z: undefined, d: null, src: [], note: r };
      w.z = wordZipf(w);
      n++;
    } else if (uk && !w.uk && uk.toLowerCase() !== w.t.toLowerCase()) w.uk = uk;
    if (themeId && !w.th.includes(themeId)) w.th.push(themeId);
    const f = typeof item === 'object' && +item.familiarity;
    if (themeId && f >= 1 && f <= 5) (w.fam ||= {})[themeId] = Math.round(f);
    if (!w.src.includes(SRC[src])) w.src.push(SRC[src]);
  }
  changed();
  return n;
}
function removeThemeFromWords(ids) {
  for (const [k, w] of Object.entries(P.words)) {
    w.th = w.th.filter(t => !ids.has(t));
    if (w.x) w.x = w.x.filter(t => !ids.has(t));
    if (w.sg) for (const t of Object.keys(w.sg)) if (ids.has(t)) delete w.sg[t];
    if (!w.th.length) delete P.words[k];
  }
}

// ---------- themes ----------

function makeTheme(name, parent, extra) {
  const b = slug(name) || 'theme';
  let id = b, i = 2;
  while (theme(id)) id = b + '_' + i++;
  const t = { id, name: name.trim(), label: '', parent: parent || null, group: false, kind: '', region: '', d: null, note: '', ...extra };
  // Keep siblings together: insert after the parent's last descendant.
  let at = P.themes.length;
  if (parent) { const ds = desc(parent); for (let k = P.themes.length - 1; k >= 0; k--) if (ds.has(P.themes[k].id)) { at = k + 1; break; } }
  P.themes.splice(at, 0, t);
  changed();
  return id;
}
function deleteTheme(id) {
  const ds = desc(id);
  P.themes = P.themes.filter(t => !ds.has(t.id));
  removeThemeFromWords(ds);
  if (ds.has(UI.sel)) UI.sel = null;
  changed();
}
function reveal(id) { for (const a of (ix().anc[id] || []).slice(1)) UI.exp[a] = true; }

// ---------- saving ----------

const FIELDS_T = ['id', 'name', 'label', 'parent', 'group', 'kind', 'region', 'difficulty', 'note', 'sourceTerms', 'adult', 'separate'];
const FIELDS_W = ['text', 'themes', 'enabled', 'zipf10', 'difficulty', 'sources', 'note', 'uk', 'clashes', 'checked', 'suggestions',
  'familiarity', 'zipfEstimate10', 'adult', 'themeForms'];
// Compact project format. Themes keep their stable ids; words refer to themes by index.
function serialize() {
  const at = Object.fromEntries(P.themes.map((t, i) => [t.id, i]));
  return {
    schema: 2, app: 'wordlist-builder', saved: new Date().toISOString(),
    themeFields: FIELDS_T,
    themes: P.themes.map(t => [t.id, t.name, t.label || '', t.parent ? at[t.parent] : -1, t.group ? 1 : 0, t.kind || '', t.region || '', t.d || 0, t.note || '',
      {}, t.adult ? 1 : 0, t.sep ? 1 : 0]),
    wordFields: FIELDS_W,
    words: Object.values(P.words).map(w => [w.t, w.th.map(t => at[t]).filter(i => i !== undefined), w.on ? 1 : 0,
      w.z == null ? (w.z === null ? 0 : -1) : Math.round(w.z * 10), w.d || 0, w.src.join(''), w.note || '', w.uk || '',
      (w.x || []).map(t => at[t]).filter(i => i !== undefined), w.ck ? 1 : 0,
      Object.entries(w.sg || {}).filter(([t]) => at[t] !== undefined).map(([t, k]) => [at[t], k === 'c' ? 1 : 2]),
      Object.entries(w.fam || {}).filter(([t]) => at[t] !== undefined).map(([t, f]) => [at[t], f]),
      w.ze ? Math.round(w.ze * 10) : 0, w.adult ? 1 : 0,
      Object.entries(w.tf || {}).filter(([t]) => at[t] !== undefined).map(([t, f]) => [at[t], f])]),
  };
}
function deserialize(j) {
  if (j.schema === 2) {
    const themes = j.themes.map(a => ({ id: a[0], name: a[1], label: a[2], parent: null, group: !!a[4], kind: a[5], region: a[6], d: a[7] || null, note: a[8], ...(a[9] || {}), adult: !!a[10], sep: !!a[11] }));
    j.themes.forEach((a, i) => { if (a[3] >= 0) themes[i].parent = themes[a[3]].id; });
    const words = {};
    for (const a of j.words) words[slug(a[0])] = { t: a[0], th: a[1].map(i => themes[i].id), on: !!a[2], z: a[3] === -1 ? undefined : a[3] === 0 ? null : a[3] / 10, d: a[4] || null, src: a[5].split(''), note: a[6], uk: a[7] || '',
      x: (a[8] || []).map(i => themes[i].id), ck: !!a[9], sg: Object.fromEntries((a[10] || []).map(([i, k]) => [themes[i].id, k === 1 ? 'c' : 'a'])),
      fam: Object.fromEntries((a[11] || []).map(([i, f]) => [themes[i].id, f])), ze: a[12] ? a[12] / 10 : null, adult: !!a[13],
      tf: a[14] && a[14].length ? Object.fromEntries(a[14].map(([i, f]) => [themes[i].id, f])) : undefined };
    return { themes, words };
  }
  if (j.schema === 1 || j.words) { // first version of the builder
    const themes = (j.themes || []).map(x => ({ id: x.id, name: x.name, label: '', parent: x.parent || null, group: !!x.group, kind: '', region: '',
      d: x.difficulty && x.difficulty !== x.level ? x.difficulty : null, note: '', wd: x.wd, cn: x.cn, dm: x.dm }));
    const words = {};
    for (const x of j.words || []) words[x.id] = { t: x.text, th: x.tags || [], on: !!x.enabled, z: undefined, d: null,
      src: (x.sources || []).map(s => SRC[s]).filter(Boolean), note: x.note || '' };
    return { themes, words };
  }
  throw Error('Not a wordlist project file');
}
// The first version kept everything in localStorage under 'wlb'.
function fromOldLocal(o) {
  const themes = Object.values(o.themes || {}).map(t => ({ ...t, d: t.d || null, group: !!t.g, label: '', kind: '', region: '', note: '' }));
  const words = {};
  for (const w of Object.values(o.words || {})) words[w.id] = { t: w.t, th: w.tags, on: w.on, z: undefined, d: null, src: (w.src || []).map(s => SRC[s]).filter(Boolean), note: w.note || '' };
  return { themes, words };
}

const DB = {
  open() {
    return this.p ||= new Promise((res, rej) => {
      const r = indexedDB.open('wordlist-builder', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  },
  async get(k) { const db = await this.open(); return new Promise((res, rej) => { const q = db.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); },
  async put(k, v) { const db = await this.open(); return new Promise((res, rej) => { const tx = db.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); },
};
let saveTimer = null;
function scheduleSave() {
  $('#savestate').textContent = '·';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try { await DB.put('project', serialize()); $('#savestate').textContent = 'saved'; }
    catch (e) { $('#savestate').textContent = 'NOT SAVED'; status('Autosave failed: ' + e.message, true); }
  }, 400);
}

function download(text, name, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const stamp = () => new Date().toISOString().slice(0, 10);

// Game file: enabled words only, minified, themes by index. With the family-friendly setting on,
// adult themes (and everything under them) and adult words are left out.
function exportGame() {
  const fam = SET.familyExport;
  const themes = P.themes.filter(t => !fam || !themeAdult(t.id));
  const at = Object.fromEntries(themes.map((t, i) => [t.id, i]));
  const words = [];
  for (const w of Object.values(P.words)) {
    if (!w.on || (fam && w.adult)) continue;
    const th = w.th.filter(t => at[t] !== undefined);
    if (!th.length) continue;
    const o = SET.spelling === 'UK' ? w.t : w.uk;
    const forms = Object.entries(w.tf || {}).filter(([t]) => at[t] !== undefined).map(([t, f]) => [at[t], f, plain(f)]);
    words.push([form(w), plain(form(w)), w.z == null ? 0 : Math.round(w.z * 10), th.map(t => at[t]), th.map(t => wordDiff(w, t)),
      (w.x || []).filter(t => at[t] !== undefined).map(t => at[t]), o && o !== form(w) ? o : '', forms]);
  }
  words.sort((a, b) => a[0].localeCompare(b[0]));
  return JSON.stringify({
    v: 3, generated: new Date().toISOString(), spelling: SET.spelling, familyFriendly: !!fam,
    themeFields: ['id', 'name', 'label', 'parent', 'group', 'kind', 'region', 'difficulty', 'adult', 'separate'],
    themes: themes.map(t => [t.id, t.name, t.label || '', t.parent ? at[t.parent] : -1, t.group ? 1 : 0, t.kind || '', t.region || '', themeDiff(t.id), themeAdult(t.id) ? 1 : 0, t.sep ? 1 : 0]),
    wordFields: ['text', 'balloonText', 'zipf10', 'themes', 'difficultyPerTheme', 'clashes', 'otherSpelling', 'formsPerTheme'],
    words,
  });
}
function exportCsv() {
  const q = v => '"' + String(v).replace(/"/g, '""') + '"';
  return 'us,uk,themes,enabled,zipf,difficulty,sources,note\n' + Object.values(P.words).map(w =>
    [w.t, w.uk || '', w.th.map(pathOf).join(' | '), w.on ? 1 : 0, w.z ?? '', w.th.map(t => wordDiff(w, t)).join('|'), w.src.map(s => SRC_NAME[s]).join('|'), w.note].map(q).join(',')).join('\n');
}
function exportOutline() {
  const out = (p, d) => kidsOf(p).map(id => {
    const t = theme(id);
    return '  '.repeat(d) + t.name + (t.group ? ':' : '') + (t.kind ? ` [${t.kind}]` : '') + (t.region ? ` [region:${t.region}]` : '')
      + (t.adult ? ' [adult]' : '') + (t.sep ? ' [separate]' : '') + (t.note ? ' -- ' + t.note.replace(/\s+/g, ' ') : '') + '\n' + out(id, d + 1);
  }).join('');
  return out(null, 0);
}
// Merges an indented outline into the tree. Two spaces per level; a group has ':' after its name;
// optional tags [place] [property] [wordplay] [region:Asia] [adult]; optional ' -- note' at the end,
// e.g.   ___ball [wordplay] -- words that come before ball
function importOutline(txt) {
  let n = 0;
  const st = [];
  for (const line of txt.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const ind = line.match(/^\s*/)[0].replace(/\t/g, '  ').length;
    let name = line.trim(), note = '', kind = '', region = '', adult = false, sep = false;
    const nm = name.indexOf(' -- ');
    if (nm >= 0) { note = name.slice(nm + 4).trim(); name = name.slice(0, nm); }
    let grp = /:\s*$/.test(name);
    name = name.replace(/\s*\[([^\]]+)\]/g, (m, tag) => {
      const [k, v] = tag.split(':').map(x => x.trim());
      if (k === 'region') { const rv = (v || '').toLowerCase() === 'turkey' ? 'middle east' : (v || '').toLowerCase(); region = REGIONS.find(r => r && r.toLowerCase() === rv) || ''; }
      else if (k === 'adult') adult = true;
      else if (k === 'separate') sep = true;
      else if (k in KINDS) kind = k;
      return '';
    }).trim();
    if (name.endsWith(':')) { grp = true; name = name.slice(0, -1).trim(); }
    while (st.length && st[st.length - 1].ind >= ind) st.pop();
    const parent = st.length ? st[st.length - 1].id : null;
    let id = kidsOf(parent).find(k => theme(k).name.toLowerCase() === name.toLowerCase());
    if (!id) { id = makeTheme(name, parent, { group: grp, kind, region, adult, note, sep }); n++; }
    else { const t = theme(id); if (grp) t.group = true; if (kind) t.kind = kind; if (region) t.region = region; if (adult) t.adult = true; if (sep) t.sep = true; if (note) t.note = note; }
    st.push({ ind, id });
  }
  changed();
  return n;
}

// ---------- Claude ----------

// Prices per million tokens, for the running cost shown during long jobs (cache writes are 1.25x input).
const PRICE = { 'claude-opus-5-5': [4, 20, 0.2], 'claude-sonnet-5-5': [2, 10, 0.2], 'claude-haiku-4-5': [1, 5, 0.1] };
function cost(model, u) {
  const p = PRICE[model] || PRICE['claude-opus-5-5'];
  return ((u.input_tokens || 0) * p[0] + (u.cache_creation_input_tokens || 0) * p[0] * 1.25 + (u.cache_read_input_tokens || 0) * p[2] + (u.output_tokens || 0) * p[1]) / 1e6;
}
let lastCost = 0;
// opts.system: a long, unchanging instruction block; it is cached so repeated calls pay little for it.
async function claude(prompt, schema, maxTokens = 8000, opts = {}) {
  const key = sessionKey;
  if (!key) throw Error('Add your Anthropic API key in Settings first.');
  const model = SET.model;
  const body = { model, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }],
    output_config: { format: { type: 'json_schema', schema } } };
  if (opts.system) body.system = [{ type: 'text', text: opts.system, cache_control: { type: 'ephemeral' } }];
  const headers = { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
  if (model !== 'claude-haiku-4-5') {
    body.output_config.effort = opts.effort || 'medium';
    // If a safety classifier declines, the API retries on a suitable model instead of failing.
    body.fallbacks = 'default';
    headers['anthropic-beta'] = 'server-side-fallback-2026-07-01';
  }
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Error((j.error && j.error.message) || 'HTTP ' + r.status);
  if (j.stop_reason === 'refusal') throw Error('Claude declined this request.');
  if (j.stop_reason === 'max_tokens') throw Error('The reply was cut off. Ask for fewer items.');
  lastCost = j.usage ? cost(j.model || model, j.usage) : 0;
  return JSON.parse(j.content.filter(c => c.type === 'text').map(c => c.text).join(''));
}
const spelling = () => SET.spelling === 'UK' ? 'British spelling' : 'American spelling';
const GAME = 'Word Safari is a word-sorting puzzle. Each balloon carries one word; players drag together words that share a theme, and a completed theme reveals its name. Every theme in a level has four words, and no word may fit two themes in the same level.';

// ---------- rendering ----------

function status(m, err) { const s = document.querySelector('dialog[open] .st') || $('#msg'); s.textContent = m; s.classList.toggle('err', !!err); }

function renderTree() {
  const c = getCounts();
  const row = (id, d) => {
    const t = theme(id), kids = kidsOf(id), op = UI.exp[id], n = c[id] || { n: 0, on: 0 };
    return `<div class="th${id === UI.sel ? ' on' : ''}"${UI.unlock ? ' draggable="true"' : ''} style="padding-left:${d * 14 + 6}px" data-sel="${id}">`
      + `<span class="nm"><i class="tg"${kids.length ? ` data-tog="${id}"` : ''}>${kids.length ? (op ? '▾' : '▸') : ''}</i>`
      + (t.group ? '<b>' + esc(t.name) + '</b>' : esc(t.name)) + (t.adult ? '<span class="kind">18+</span>' : '')
      + (t.kind ? `<span class="kind">${esc(t.kind)}</span>` : '') + ` <small>${n.on}/${n.n}</small></span>`
      + `<span class="ac"><button data-add="${id}" title="Add sub-theme">+</button><button data-ren="${id}" title="Rename">✎</button><button data-del="${id}" title="Delete">✕</button></span></div>`
      + (kids.length && op ? kids.map(k => row(k, d + 1)).join('') : '');
  };
  $('#tree').innerHTML = kidsOf(null).map(id => row(id, 0)).join('') || '<p class="muted">No themes yet. Add one, or use Import / export to open the starter wordlist or add the starter theme tree.</p>';
  $('#lock').textContent = UI.unlock ? '🔓' : '🔒';
  $('#lock').title = UI.unlock ? 'Drop a theme on another to nest it, near a row edge to reorder, or on ＋ to make it top level.' : 'Dragging themes is off. Click to turn it on.';
}

function shownWords() {
  let list = Object.values(P.words);
  if (UI.sel) {
    const s = UI.sub ? pool(UI.sel) : new Set([UI.sel]);
    list = list.filter(w => w.th.some(t => s.has(t)));
  }
  const q = $('#q').value.trim().toLowerCase();
  if (q) list = list.filter(w => matches(w, q));
  const hasSg = w => !!w.sg && Object.keys(w.sg).length > 0;
  const keep = { all: null, on: w => w.on, off: w => !w.on, sug: hasSg, clash: w => !!(w.x && w.x.length), unchecked: w => !w.ck }[UI.show];
  if (keep) list = list.filter(keep);
  const key = { t: w => form(w).toLowerCase(), len: w => core(form(w)).length, z: w => w.z ?? 0, d: w => wordDiff(w, UI.sel), th: w => w.th.length }[UI.sort] || (w => w.t);
  return list.sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : form(a).localeCompare(form(b))) * UI.dir; });
}

function renderMain() {
  const t = UI.sel && theme(UI.sel);
  $('#crumbs').innerHTML = t ? '<a data-sel-crumb="">All words</a>' + (ix().anc[t.id] || []).slice(1).reverse().map(a => ` › <a data-sel-crumb="${a}">${esc(theme(a).name)}</a>`).join('') : '';
  $('#ttl').textContent = t ? t.name : 'All words';
  $('#meta').textContent = t
    ? [KINDS[t.kind || ''], t.group ? 'group' : '', 'difficulty ' + themeDiff(t.id) + (t.d ? '' : ' (from depth)'), t.region,
      t.sep ? 'words not counted in parent' : '', themeAdult(t.id) ? 'not family-friendly' + (t.adult ? '' : ' (inherited)') : '', t.label ? 'shown as "' + t.label + '"' : '', t.note].filter(Boolean).join(' · ')
    : 'Select a theme on the left, or use the buttons below.';
  $('#genWords').disabled = $('#addWords').disabled = $('#themeSet').disabled = !t;
  $('#overlap').innerHTML = t ? overlapHtml(t.id) : '';
  const pend = reviewRows(null).length;
  $('#reviewBtn').hidden = !pend;
  $('#reviewBtn').textContent = `Review suggestions (${pend})`;
  $('#checkBtn').disabled = !!CHECK;
  $('#genSubs').textContent = t ? 'Generate sub-themes…' : 'Generate top-level themes…';
  $('#spell').textContent = 'Spelling: ' + SET.spelling;
  $('#sub').checked = UI.sub;
  $('#show').value = UI.show;
  for (const h of document.querySelectorAll('th[data-sort]')) h.className = h.dataset.sort === UI.sort ? 's' + UI.dir : '';

  const ws = shownWords();
  shownIds = ws.map(w => slug(w.t));
  const shown = new Set(shownIds);
  for (const id of [...PICK]) if (!shown.has(id)) PICK.delete(id);
  $('#cnt').textContent = ws.length + ' words, ' + ws.filter(w => w.on).length + ' enabled';
  const n = PICK.size;
  $('#selinfo').textContent = n ? `${n} selected` : 'Tick words to select them (shift-click for a range).';
  for (const b of ['#selEna', '#selDis', '#selDel']) $(b).disabled = !n;
  $('#selUnlink').disabled = !n || !t;
  $('#selNone').hidden = !n;
  $('#undo').hidden = !undoSnap;
  if (undoSnap) $('#undo').textContent = 'Undo ' + undoSnap.label;
  $('#selall').checked = n > 0 && n === ws.length;
  $('#selall').indeterminate = n > 0 && n < ws.length;
  $('#rows').innerHTML = ws.slice(0, limit).map(w => {
    const id = slug(w.t), z = w.z, picked = PICK.has(id);
    const zc = z == null ? 'z2' : z >= 4.5 ? 'z5' : z < 2.5 ? 'z2' : '';
    return `<tr class="${w.on ? '' : 'off'}${picked ? ' sel' : ''}"><td><input type="checkbox" data-pick="${id}"${picked ? ' checked' : ''}></td>`
      + `<td><input type="checkbox" data-on="${id}"${w.on ? ' checked' : ''} title="Enabled"></td>`
      + `<td class="w" data-word="${id}"${w.uk ? ` title="${esc(SET.spelling === 'UK' ? 'US: ' + w.t : 'UK: ' + w.uk)}"` : ''}>${esc(formIn(w, UI.sel))}${w.uk ? ' <small class="muted">*</small>' : ''}</td><td class="num">${core(form(w)).length}</td>`
      + `<td class="num ${zc}"${zipfEstimated(w) ? ' title="Estimated: not in the frequency list"' : ''}>${z === undefined ? '…' : z === null ? '<1.5' : (zipfEstimated(w) ? '~' : '') + z.toFixed(1)}</td>`
      + `<td><select data-d="${id}" title="${famOf(w, UI.sel) ? 'auto: familiarity in this theme' : 'auto: from frequency'}"><option value="">auto ${famOf(w, UI.sel) || autoDiff(z)}</option>${[1, 2, 3, 4, 5].map(n => `<option${n === w.d ? ' selected' : ''}>${n}</option>`).join('')}</select></td>`
      + `<td>${w.th.map(t => theme(t) ? `<button class="b" data-goto="${t}" title="${esc(pathOf(t))}">${esc(theme(t).name)}</button>` : '').join('')}`
      + (w.x || []).map(t => theme(t) ? `<button class="b clash" data-goto="${t}" title="Clashes with ${esc(pathOf(t))}: never in the same level">⚠ ${esc(theme(t).name)}</button>` : '').join('')
      + (w.sg && Object.keys(w.sg).length ? `<button class="b sug" data-review="${id}" title="Suggestions from the theme check">${Object.keys(w.sg).length} to review</button>` : '') + '</td>'
      + `<td class="muted">${esc(w.note)}</td><td><button class="x" data-rm="${id}" title="Delete this word">✕</button></td></tr>`;
  }).join('');
  $('#more').innerHTML = ws.length > limit ? `<div class="row"><span class="muted">Showing ${limit} of ${ws.length}.</span><button id="showMore">Show more</button></div>` : '';
}

function renderFound() {
  const q = $('#find').value.trim().toLowerCase();
  if (!q) { $('#found').innerHTML = ''; return; }
  const ts = P.themes.filter(t => t.name.toLowerCase().includes(q)).slice(0, 15);
  const ws = Object.values(P.words).filter(w => matches(w, q))
    .sort((a, b) => (form(b).toLowerCase().startsWith(q) - form(a).toLowerCase().startsWith(q)) || form(a).localeCompare(form(b))).slice(0, 40);
  $('#found').innerHTML = (ts.length ? '<h4>Themes</h4>' + ts.map(t => `<div class="hit" data-goto="${t.id}">${esc(t.name)} <small class="muted">${esc(pathOf(t.id).split(' > ').slice(0, -1).join(' > '))}</small></div>`).join('') : '')
    + (ws.length ? '<h4>Words</h4>' + ws.map(w => `<div class="hit" data-word="${slug(w.t)}">${esc(form(w))} <small class="muted">${esc(w.th.map(t => theme(t)?.name).join(', '))}</small></div>`).join('') : '')
    || '<span class="muted">No matches</span>';
}

function render() { renderTree(); renderMain(); renderFound(); saveLocal(); }

// ---------- dialogs ----------

// Opens the shared <dialog>. body is HTML; buttons is [[label, fn, cls]]; a fn returning false keeps it open.
function dialog(title, body, buttons = [], onOpen) {
  const d = $('#dlg');
  d.innerHTML = `<div class="hd"><span>${esc(title)}</span><button data-x>✕</button></div><div class="bd">${body}<div class="st"></div></div>`
    + `<div class="ft">${buttons.map((b, i) => `<button data-b="${i}" class="${b[2] || ''}">${esc(b[0])}</button>`).join('')}</div>`;
  d.querySelector('[data-x]').onclick = () => d.close();
  buttons.forEach((b, i) => {
    const el = d.querySelector(`[data-b="${i}"]`);
    el.onclick = async () => {
      el.disabled = true;
      try { if (await b[1](d) !== false) d.close(); }
      catch (e) { status('Error: ' + e.message, true); }
      finally { el.disabled = false; }
      render();
    };
  });
  if (!d.open) d.showModal();
  if (onOpen) onOpen(d);
  return d;
}
const val = (d, s) => d.querySelector(s).value;
const chk = (d, s) => d.querySelector(s).checked;
const field = (label, input) => `<label class="f"><span>${label}</span>${input}</label>`;
const options = (pairs, cur) => pairs.map(([v, l]) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(l)}</option>`).join('');

function ask(title, def = '') {
  return new Promise(res => {
    let answer = null;
    const d = dialog(title, `<input id="askv" style="width:100%" value="${esc(def)}">`, [['Cancel', () => { }], ['OK', d => { answer = val(d, '#askv').trim(); }, 'p']]);
    const i = d.querySelector('#askv'); i.focus(); i.select();
    i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); d.querySelector('[data-b="1"]').click(); } };  // preventDefault: Enter must not also press the button underneath
    // Answer only once the box has closed, so callers can report into the page.
    d.addEventListener('close', () => setTimeout(() => res(answer)), { once: true });
  });
}
// Asks for a new theme's name and whether it is a group. Resolves to {name, group} or null.
function newThemeBox(parentId) {
  return new Promise(res => {
    let answer = null;
    const where = parentId ? `under "${theme(parentId).name}"` : 'at the top level';
    const d = dialog(parentId ? 'New sub-theme' : 'New top-level group', `<p class="muted">Adding ${esc(where)}.</p>`
      + `<input id="nt-n" style="width:100%" placeholder="name">`
      + `<label class="pick"><input type="checkbox" id="nt-g"${parentId ? '' : ' checked'}> Group: a folder for browsing, never used as a theme in a level</label>`,
      [['Cancel', () => { }], ['Add', d => { const n = val(d, '#nt-n').trim(); if (n) answer = { name: n, group: chk(d, '#nt-g') }; }, 'p']]);
    const i = d.querySelector('#nt-n'); i.focus();
    i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); d.querySelector('[data-b="1"]').click(); } };  // preventDefault: Enter must not also press the button underneath
    d.addEventListener('close', () => setTimeout(() => res(answer)), { once: true });
  });
}
function confirmBox(msg) {
  return new Promise(res => {
    let ok = false;
    const d = dialog('Confirm', `<p>${esc(msg)}</p>`, [['Cancel', () => { }], ['OK', () => { ok = true; }, 'p']]);
    d.addEventListener('close', () => setTimeout(() => res(ok)), { once: true });
  });
}

function genWordsDialog() {
  const t = theme(UI.sel);
  const have = Object.values(P.words).filter(w => w.th.includes(t.id)).length;
  dialog('Generate words: ' + t.name, `<p class="muted">${esc(pathOf(t.id))} · ${have} words linked directly</p>`
    + field('How many', '<input id="gw-n" type="number" value="40" min="5" max="200">')
    + field('Range', `<select id="gw-r">${options([['mixed', 'Mixed: common to harder'], ['easy', 'Common words most players know'], ['hard', 'Harder, more specialist words']], 'mixed')}</select>`)
    + field('Extra guidance (optional)', '<textarea id="gw-g" rows="2" placeholder="e.g. avoid brand names; include regional dishes"></textarea>')
    + `<label class="pick"><input type="checkbox" id="gw-x" checked> Send the theme's existing words so Claude suggests new ones</label>`
    + `<p class="muted">Model: ${esc(SET.model)} · words failing the filters in Settings are added disabled.</p>`,
    [['Close', () => { }], ['Generate', async d => {
      status('Asking Claude…');
      const n = Math.max(5, Math.min(200, +val(d, '#gw-n') || 40));
      const range = { mixed: 'Cover a spread from everyday words to harder, less common ones.', easy: 'Only common words that most adults know.', hard: 'Prefer harder, more specialist words; avoid the most obvious ones.' }[val(d, '#gw-r')];
      const existing = chk(d, '#gw-x') ? [...desc(t.id)].flatMap(id => Object.values(P.words).filter(w => w.th.includes(id)).map(w => w.t)) : [];
      const prompt = `${GAME}

List up to ${n} English words for the theme "${pathOf(t.id)}"${t.note ? ` (${t.note})` : ''}.
Theme kind: ${KINDS[t.kind || '']}: ${KIND_HELP[t.kind || '']}.
- Each word must clearly belong to the theme: most adults would agree without debate.
- Lowercase, except proper nouns (names of people, places, gods, brands), which take normal capitals.
- Singular unless the word is normally plural.
- Give "word" in American spelling. Give "uk" as the British spelling only when it differs (colour, jewellery, aeroplane); otherwise an empty string.
- Give "familiarity" from 1 to 5: how readily an average adult would recognise the word as a member of THIS theme (1 everyone, 3 most people who know the topic a little, 5 specialists).
- ${SET.flt.multi ? 'Single words only, no spaces or hyphens.' : `Prefer single words. Two-word names are fine when that is the usual name (shown on two lines): at most ${SET.flt.maxMulti} letters in total and ${SET.flt.max} per word.`} Single words: ${SET.flt.min} to ${SET.flt.max} letters.
- ${range}
${existing.length ? '- Do not repeat any of these existing words: ' + [...new Set(existing)].join(', ') + '\n' : ''}${val(d, '#gw-g').trim() ? '- ' + val(d, '#gw-g').trim() + '\n' : ''}Fewer words is fine if the theme has fewer clear members.`;
      const r = await claude(prompt, { type: 'object', additionalProperties: false, required: ['words'], properties: { words: { type: 'array', items: {
        type: 'object', additionalProperties: false, required: ['word', 'uk', 'familiarity'], properties: { word: { type: 'string' }, uk: { type: 'string' }, familiarity: { type: 'integer' } } } } } });
      const before = Object.values(P.words).filter(w => w.th.includes(t.id)).length;
      const fresh = addWords(r.words, 'llm', t.id);
      const linked = Object.values(P.words).filter(w => w.th.includes(t.id)).length - before;
      render();
      status(`Claude returned ${r.words.length}: ${fresh} new to the project, ${linked - fresh} existing words linked, ${r.words.length - linked} already here.`);
      return false;
    }, 'p']]);
}

function genSubsDialog() {
  const t = UI.sel && theme(UI.sel);
  dialog(t ? 'Generate sub-themes: ' + t.name : 'Generate top-level themes', (t ? `<p class="muted">${esc(pathOf(t.id))}</p>` : '')
    + field('How many', '<input id="gs-n" type="number" value="8" min="1" max="30">')
    + field('Kind', `<select id="gs-k">${options([['any', 'Any kind'], ...Object.entries(KINDS).map(([k, v]) => [k, v + ': ' + KIND_HELP[k]])], 'any')}</select>`)
    + field('Extra guidance (optional)', '<textarea id="gs-g" rows="2" placeholder="e.g. more specific; suitable for children"></textarea>')
    + '<div id="gs-res"></div>',
    [['Close', () => { }], ['Suggest', async d => {
      status('Asking Claude…');
      const n = Math.max(1, Math.min(30, +val(d, '#gs-n') || 8)), k = val(d, '#gs-k');
      const kids = kidsOf(t && t.id).map(i => theme(i).name);
      const sibs = t ? kidsOf(t.parent).filter(i => i !== t.id).map(i => theme(i).name) : [];
      const prompt = `${GAME}

We are building a tree of themes for the game. ${t ? `Suggest ${n} sub-themes of "${pathOf(t.id)}"${t.note ? ` (${t.note})` : ''}.` : `Suggest ${n} top-level theme categories covering a wide range of general knowledge.`}
- Each must be a clear category with at least 12 member words that most adults would recognise, ideally 20 or more.
- Short lowercase names of 1 to 3 words, ${spelling()}.
- No overlap with each other${kids.length ? ' or with these existing sub-themes: ' + kids.join(', ') : ''}.
${sibs.length ? `- For context, the sibling themes are: ${sibs.join(', ')}.\n` : ''}- Kinds: ${Object.entries(KINDS).map(([k, v]) => v + ' (' + KIND_HELP[k] + ')').join('; ')}.
${k !== 'any' ? `- Only suggest themes of kind "${KINDS[k]}".\n` : ''}${val(d, '#gs-g').trim() ? '- ' + val(d, '#gs-g').trim() + '\n' : ''}Give four example member words for each.`;
      const r = await claude(prompt, { type: 'object', additionalProperties: false, required: ['themes'], properties: { themes: { type: 'array', items: {
        type: 'object', additionalProperties: false, required: ['name', 'kind', 'examples'],
        properties: { name: { type: 'string' }, kind: { type: 'string', enum: Object.values(KINDS) }, examples: { type: 'array', items: { type: 'string' } } } } } } });
      const res = d.querySelector('#gs-res');
      const list = r.themes.filter(x => x.name && !kids.some(c => c.toLowerCase() === x.name.trim().toLowerCase()));
      res.innerHTML = '<h4>Pick the ones to add</h4>' + list.map((x, i) => `<label class="pick"><input type="checkbox" data-i="${i}" checked> <b>${esc(x.name)}</b> <span class="kind">${esc(x.kind)}</span> <small class="muted">${esc(x.examples.join(', '))}</small></label>`).join('')
        + `<div class="row"><button class="p" id="gs-add">Add selected</button></div>`;
      res.querySelector('#gs-add').onclick = () => {
        let c = 0;
        for (const cb of res.querySelectorAll('input[data-i]:checked')) {
          const x = list[+cb.dataset.i], kind = Object.keys(KINDS).find(key => KINDS[key] === x.kind) || '';
          makeTheme(x.name.trim().toLowerCase(), t && t.id, { kind });
          c++;
        }
        if (t) UI.exp[t.id] = true;
        d.close();
        render();
        status(`Added ${c} theme${c === 1 ? '' : 's'}.`);
      };
      status(list.length + ' suggestions.');
      return false;
    }, 'p']]);
}

function addWordsDialog() {
  const t = theme(UI.sel);
  dialog('Add words: ' + t.name, field('Words, one per line or comma-separated', '<textarea id="aw" rows="6"></textarea>'),
    [['Close', () => { }], ['Add', d => {
      const n = addWords(val(d, '#aw').split(/[\n,]+/), 'manual', t.id);
      d.querySelector('#aw').value = '';
      render();
      status(`${n} new words added.`);
      return false;
    }, 'p']]);
}

function themeDialog() {
  const t = theme(UI.sel);
  dialog('Theme settings', field('Name', `<input id="ts-n" value="${esc(t.name)}">`)
    + field('Name shown in the game (optional, keep it short)', `<input id="ts-l" value="${esc(t.label)}" placeholder="${esc(t.name.replace(/^./, c => c.toUpperCase()))}">`)
    + field('Kind', `<select id="ts-k">${options(Object.entries(KINDS).map(([k, v]) => [k, v + ': ' + KIND_HELP[k]]), t.kind || '')}</select>`)
    + field('Region (acts: 1 Middle East incl. Turkey, Africa · 2 Asia · 3 Oceania · 4 Antarctica · 5 South America · 6 North America · 7 Europe, Turkey)', `<select id="ts-r">${options(REGIONS.map(r => [r, r || 'Any']), t.region || '')}</select>`)
    + field('Difficulty', `<select id="ts-d"><option value="">From depth (${Math.min(5, depth(t.id))})</option>${[1, 2, 3, 4, 5].map(n => `<option${t.d === n ? ' selected' : ''}>${n}</option>`).join('')}</select>`)
    + field('Notes (also sent to Claude to steer generation)', `<textarea id="ts-o" rows="2">${esc(t.note)}</textarea>`)
    + `<label class="pick"><input type="checkbox" id="ts-g"${t.group ? ' checked' : ''}> Group: a container for browsing, never used as a theme in a level</label>`
    + (t.parent ? `<label class="pick"><input type="checkbox" id="ts-sep"${t.sep ? '' : ' checked'}> Its words also count as members of "${esc(theme(t.parent).name)}" (untick for themes like apple varieties, whose words mean nothing in the parent on their own)</label>` : '')
    + `<label class="pick"><input type="checkbox" id="ts-ff"${t.adult ? '' : ' checked'}> Family-friendly${!t.adult && themeAdult(t.id) ? ' (but a parent theme is not, so this one is left out too)' : ''}</label>`
    + `<h4>Danger</h4><button class="danger" id="ts-del">Delete theme and its sub-themes…</button>`,
    [['Cancel', () => { }], ['Save', d => {
      t.name = val(d, '#ts-n').trim() || t.name; t.label = val(d, '#ts-l').trim(); t.kind = val(d, '#ts-k'); t.region = val(d, '#ts-r');
      t.d = val(d, '#ts-d') ? +val(d, '#ts-d') : null; t.note = val(d, '#ts-o').trim(); t.group = chk(d, '#ts-g'); t.adult = !chk(d, '#ts-ff'); if (d.querySelector('#ts-sep')) t.sep = !chk(d, '#ts-sep');
      changed();
    }, 'p']], d => {
      d.querySelector('#ts-del').onclick = async () => { if (await confirmBox(`Delete "${t.name}" and its sub-themes? Words left with no theme are removed.`)) { deleteTheme(t.id); render(); } };
    });
}

function wordDialog(id) {  // id changes if the American spelling is edited
  const w = P.words[id];
  if (!w) return;
  let keep = () => { };  // reads the dialog's fields back into the word; set when the dialog opens
  const draw = () => dialog('Word: ' + form(w), `<p>${w.z == null ? 'Rarer than the frequency list' : (zipfEstimated(w) ? 'Estimated Zipf frequency ' : 'Zipf frequency ') + w.z.toFixed(1)} · ${core(form(w)).length} letters · from ${w.src.map(s => SRC_NAME[s]).join(', ') || '?'}</p>`
    + `<div class="row"><label class="f" style="flex:1"><span>American spelling</span><input id="wd-us" value="${esc(w.t)}"></label>`
    + `<label class="f" style="flex:1"><span>British spelling (if different)</span><input id="wd-uk" value="${esc(w.uk)}"></label></div>`
    + `<label class="pick"><input type="checkbox" id="wd-on"${w.on ? ' checked' : ''}> Enabled</label>`
    + `<label class="pick"><input type="checkbox" id="wd-ff"${w.adult ? '' : ' checked'}> Family-friendly</label>`
    + field('Estimated Zipf, used only when the word is not in the frequency list', `<input id="wd-ze" type="number" step="0.1" min="0" max="8" value="${w.ze || ''}">`)
    + field('Note', `<input id="wd-note" value="${esc(w.note)}">`)
    + '<h4>Linked themes</h4><p class="muted">Familiarity: 1 everyone knows it belongs, 5 specialists only. It sets the difficulty in that theme.</p>'
    + (w.th.map(t => `<div class="row"><button class="link" data-wgo="${t}">${esc(pathOf(t))}</button><span class="grow"></span>`
      + `<select data-fam="${t}" title="Familiarity in this theme"><option value="">familiarity ?</option>${[1, 2, 3, 4, 5].map(n => `<option${w.fam && w.fam[t] === n ? ' selected' : ''}>${n}</option>`).join('')}</select>`
      + `<button class="b" data-unlink="${t}" title="Unlink">✕</button></div>`).join('') || '<p class="muted">None</p>')
    + `<div class="row"><input id="wd-add" list="wd-themes" placeholder="Link to another theme…" style="flex:1"><button id="wd-addb">Link</button></div>`
    + '<h4>Clashes</h4><p class="muted">Themes a player might think this word belongs to. It is never put in a level with them.</p>'
    + ((w.x || []).map(t => theme(t) ? `<div class="row"><button class="link" data-wgo="${t}">⚠ ${esc(pathOf(t))}</button><button class="b" data-unclash="${t}" title="Remove clash">✕</button></div>` : '').join('') || '<p class="muted">None</p>')
    + `<div class="row"><input id="wd-clash" list="wd-themes" placeholder="Add a clash with…" style="flex:1"><button id="wd-clashb">Add</button></div>`
    + (w.sg && Object.keys(w.sg).length ? `<p>${Object.keys(w.sg).length} suggestion(s) from the theme check: ${esc(Object.entries(w.sg).map(([t, k]) => (theme(t) ? theme(t).name : '?') + (k === 'c' ? ' (clear)' : ' (arguable)')).join(', '))} <button id="wd-rev">Review</button></p>` : '')
    + `<datalist id="wd-themes">${P.themes.filter(t => !w.th.includes(t.id)).map(t => `<option value="${esc(pathOf(t.id))}">`).join('')}</datalist>`
    + `<h4>Danger</h4><button class="danger" id="wd-del">Delete word</button>`,
    [['Close', () => { if (keep() === false) return false; changed(); }, 'p']], d => {
      keep = () => {
        w.on = chk(d, '#wd-on'); w.note = val(d, '#wd-note').trim(); w.adult = !chk(d, '#wd-ff');
        w.ze = +val(d, '#wd-ze') || null;
        d.querySelectorAll('[data-fam]').forEach(sel => { if (sel.value) (w.fam ||= {})[sel.dataset.fam] = +sel.value; else if (w.fam) delete w.fam[sel.dataset.fam]; });
        const us = clean(val(d, '#wd-us')), uk = clean(val(d, '#wd-uk'));
        w.uk = uk && uk.toLowerCase() !== (us || w.t).toLowerCase() ? uk : '';
        if (us && us !== w.t) {
          const nid = slug(us), other = findWord(us);
          if (!nid || (other && other !== w)) { status(`"${us}" is already a separate word.`, true); return false; }
          delete P.words[id]; w.t = us; id = nid; P.words[id] = w;
        }
        w.z = wordZipf(w);
      };
      d.querySelectorAll('[data-unlink]').forEach(b => b.onclick = () => {
        if (keep() === false) return; w.th = w.th.filter(t => t !== b.dataset.unlink);
        if (!w.th.length) { delete P.words[id]; d.close(); } else draw();
        changed(); render();
      });
      d.querySelectorAll('[data-wgo]').forEach(b => b.onclick = () => { if (keep() === false) return; changed(); d.close(); select(b.dataset.wgo); });
      d.querySelector('#wd-addb').onclick = () => {
        const p = val(d, '#wd-add').trim(), t = P.themes.find(x => pathOf(x.id) === p);
        if (!t) return status('Pick a theme from the list.', true);
        if (keep() === false) return; w.th.push(t.id); changed(); render(); draw();
      };
      d.querySelectorAll('[data-unclash]').forEach(b => b.onclick = () => { if (keep() === false) return; w.x = w.x.filter(t => t !== b.dataset.unclash); changed(); render(); draw(); });
      d.querySelector('#wd-clashb').onclick = () => {
        const p = val(d, '#wd-clash').trim(), t = P.themes.find(x => pathOf(x.id) === p);
        if (!t) return status('Pick a theme from the list.', true);
        if (keep() === false) return;
        w.x ||= []; if (!w.x.includes(t.id)) w.x.push(t.id); changed(); render(); draw();
      };
      if (d.querySelector('#wd-rev')) d.querySelector('#wd-rev').onclick = () => { if (keep() === false) return; changed(); reviewDialog([w]); };
      d.querySelector('#wd-del').onclick = () => { delete P.words[id]; changed(); d.close(); render(); };
    });
  draw();
}

function settingsDialog() {
  const f = SET.flt;
  dialog('Settings', '<h4>Claude</h4>'
    + field('Anthropic API key', `<input id="se-key" type="password" value="${esc(sessionKey)}" autocomplete="off">`)
    + `<label class="pick"><input type="checkbox" id="se-rem"${SET.remember ? ' checked' : ''}> Remember the key in this browser (only on a computer you trust)</label>`
    + field('Model', `<select id="se-model">${options(MODELS, SET.model)}</select>`)
    + '<h4>Spelling</h4>'
    + field('Show and export', `<select id="se-sp">${options([['US', 'American (color, jewelry)'], ['UK', 'British (colour, jewellery)']], SET.spelling)}</select>`)
    + '<p class="muted">Words keep both spellings; this picks which one is shown, searched first and written to the game file. The toolbar button switches it too.</p>'
    + '<h4>Exports</h4>'
    + `<label class="pick"><input type="checkbox" id="se-fam"${SET.familyExport ? ' checked' : ''}> Family-friendly game file: leave out themes and words not marked family-friendly</label>`
    + '<h4>Filters for new words</h4><p class="muted">Words that fail are still added, but disabled, with the reason in the note.</p>'
    + `<div class="row"><label><input type="checkbox" id="se-len"${f.len ? ' checked' : ''}> Length</label> single words <input id="se-min" type="number" value="${f.min}"> to <input id="se-max" type="number" value="${f.max}"> letters</div>`
    + `<div class="row">two-word names (shown on two lines): at most <input id="se-mm" type="number" value="${f.maxMulti}"> letters in total</div>`
    + `<div class="row"><label><input type="checkbox" id="se-let"${f.letters ? ' checked' : ''}> Letters, digits, apostrophes and &amp; only</label><label><input type="checkbox" id="se-mul"${f.multi ? ' checked' : ''}> Single words only</label><label><input type="checkbox" id="se-blk"${f.block ? ' checked' : ''}> Blocklist</label></div>`
    + `<textarea id="se-list" rows="2" placeholder="blocklist words, comma or space separated">${esc(f.list)}</textarea>`
    + `<div class="row"><button id="se-re">Re-apply filters to all words…</button></div>`,
    [['Cancel', () => { }], ['Save', d => {
      const read = () => {
        sessionKey = val(d, '#se-key').trim(); SET.remember = chk(d, '#se-rem'); SET.model = val(d, '#se-model'); SET.spelling = val(d, '#se-sp'); SET.familyExport = chk(d, '#se-fam');
        Object.assign(SET.flt, { len: chk(d, '#se-len'), min: +val(d, '#se-min'), max: +val(d, '#se-max'), maxMulti: +val(d, '#se-mm'), letters: chk(d, '#se-let'), multi: chk(d, '#se-mul'), block: chk(d, '#se-blk'), list: val(d, '#se-list') });
      };
      read(); saveLocal();
    }, 'p']], d => {
      d.querySelector('#se-re').onclick = async () => {
        Object.assign(SET.flt, { len: chk(d, '#se-len'), min: +val(d, '#se-min'), max: +val(d, '#se-max'), maxMulti: +val(d, '#se-mm'), letters: chk(d, '#se-let'), multi: chk(d, '#se-mul'), block: chk(d, '#se-blk'), list: val(d, '#se-list') });
        saveLocal();
        if (!await confirmBox('Reset the enabled state and note of every word from the filters? Manual changes are lost.')) return;
        for (const w of Object.values(P.words)) { const r = filterReason(w.t); w.on = !r; w.note = r; }
        changed(); render();
      };
    });
}

function dataDialog() {
  dialog('Import / export', '<h4>Project: theme tree and words (.json)</h4><p class="muted">Everything in the app. It is autosaved in this browser; save a file to back it up or move it to another browser. Opening one <b>replaces</b> the current project.</p>'
    + '<div class="row"><button id="dx-save" class="p">Save project</button><button id="dx-open">Open project…</button><button id="dx-wl">Open starter wordlist</button></div>'
    + '<h4>Theme tree only, no words (.txt)</h4><p class="muted">The tree as an indented text list you can edit in any text editor. Importing <b>adds</b> its themes to the current tree.</p>'
    + '<div class="row"><button id="dx-starter">Add starter theme tree</button><button id="dx-imp">Import theme tree…</button><button id="dx-out">Export theme tree</button></div>'
    + '<h4>For the game and spreadsheets (export only)</h4><p class="muted">The game file holds enabled words only, compact, family-friendly if set in Settings.</p>'
    + '<div class="row"><button id="dx-game">Export game file</button><button id="dx-csv">Export CSV</button></div>'
    + '<h4>Maintenance</h4><div class="row"><button id="dx-uk">Find British spellings (Claude)</button><button id="dx-freq">Recompute frequencies</button><button id="dx-clrw" class="danger">Delete all words…</button><button id="dx-clr" class="danger">Delete everything…</button></div>'
    + '<input type="file" id="dx-file" hidden>',
    [['Close', () => { }]], d => {
      const on = (s, fn) => d.querySelector(s).onclick = fn;
      const pickFile = (accept, fn) => { const f = d.querySelector('#dx-file'); f.accept = accept; f.value = ''; f.onchange = () => f.files[0] && f.files[0].text().then(fn).catch(e => status('Error: ' + e.message, true)); f.click(); };
      on('#dx-save', () => download(JSON.stringify(serialize()), `wordlist-project-${stamp()}.json`));
      on('#dx-open', () => pickFile('.json', async txt => {
        const p = deserialize(JSON.parse(txt));
        if (!await confirmBox(`Replace the current project with this file (${p.themes.length} themes, ${Object.keys(p.words).length} words)?`)) return;
        P = p; UI.sel = null; changed(); fillFreq(); render();
      }));
      on('#dx-wl', async () => {
        try {
          status('Loading the starter wordlist…');
          const r = await fetch('data/wordlist.json?v=' + VERSION);
          if (!r.ok) throw Error(r.status === 404 ? 'not built yet' : r.status);
          const p = deserialize(await r.json());
          if (!await confirmBox(`Replace the current project with the starter wordlist (${p.themes.length} themes, ${Object.keys(p.words).length} words)?`)) return;
          P = p; UI.sel = null; changed(); fillFreq(); render();
        } catch (e) { status('Could not load the starter wordlist: ' + e.message, true); }
      });
      on('#dx-game', () => download(exportGame(), `wordlist-game-${stamp()}.json`));
      on('#dx-csv', () => download(exportCsv(), `wordlist-${stamp()}.csv`, 'text/csv'));
      on('#dx-out', () => download(exportOutline(), `themes-${stamp()}.txt`, 'text/plain'));
      on('#dx-starter', async () => {
        try { const r = await fetch('data/themes.txt?v=' + VERSION); if (!r.ok) throw Error(r.status); status(`Added ${importOutline(await r.text())} themes.`); render(); }
        catch (e) { status('Could not load the starter outline: ' + e.message, true); }
      });
      on('#dx-imp', () => pickFile('.txt', txt => { status(`Added ${importOutline(txt)} themes.`); render(); }));
      on('#dx-uk', async () => {
        const todo = Object.values(P.words).filter(w => !w.uk && !w.ukChecked);
        if (!todo.length) return status('Every word has been checked.');
        let found = 0;
        for (let i = 0; i < todo.length; i += 300) {
          status(`Checking words ${i + 1} to ${Math.min(i + 300, todo.length)} of ${todo.length}…`);
          const chunk = todo.slice(i, i + 300);
          const r = await claude(`These English words are in American spelling. List only those whose British spelling is different, with the British form (color → colour, jewelry → jewellery, airplane → aeroplane, donut → doughnut). Leave out words spelled the same.\n\n${chunk.map(w => w.t).join('\n')}`,
            { type: 'object', additionalProperties: false, required: ['pairs'], properties: { pairs: { type: 'array', items: {
              type: 'object', additionalProperties: false, required: ['word', 'uk'], properties: { word: { type: 'string' }, uk: { type: 'string' } } } } } });
          for (const x of r.pairs) { const w = P.words[slug(x.word)]; if (w && !w.uk && x.uk && x.uk.toLowerCase() !== w.t.toLowerCase()) { w.uk = clean(x.uk); w.z = wordZipf(w); found++; } }
          for (const w of chunk) w.ukChecked = true;
          changed(); render();
        }
        status(`Added ${found} British spellings.`);
      });
      on('#dx-freq', () => { for (const w of Object.values(P.words)) w.z = wordZipf(w); changed(); render(); status(FREQ ? 'Frequencies updated.' : 'The frequency list is not loaded.', !FREQ); });
      on('#dx-clrw', async () => { if (await confirmBox('Delete every word in every theme? Themes are kept.')) { P.words = {}; changed(); render(); } });
      on('#dx-clr', async () => { if (await confirmBox('Delete all themes and all words?')) { P = { themes: [], words: {} }; UI.sel = null; changed(); render(); } });
    });
}

// ---------- theme check ----------
// Claude is shown every playable theme and asked which other themes each word fits.
// Results are stored as suggestions (w.sg) and only become links or clashes after review.

const playable = () => P.themes.filter(t => !t.group);
// A word's themes and their parents: fitting these is expected, not news.
function related(w) { const s = new Set(); for (const t of w.th) for (const a of ix().anc[t] || []) s.add(a); return s; }

function checkSystem(list) {
  return `${GAME}

Your job: for each word, find the other themes in the list below that the word also fits, besides the themes it is already in and their parent themes.
- "clear": the word is a fair member of that theme; players would accept it there.
- "arguable": not a strict member, but a player could reasonably think it belongs (another meaning of the word, a loose association, a common belief). These are what make a level unfair.
Consider every meaning of a word: python is a snake and a programming language; mercury is a planet, an element and a god. Wordplay themes count too: foot fits "___ball".
Leave out themes that are only loosely related. Only list words that fit at least one more theme, and refer to themes by their number.

Themes:
${list.map((t, i) => `${i}. ${t.name} (${pathOf(t.id).split(' > ').slice(0, -1).join(' > ')})${t.kind ? ' [' + KINDS[t.kind] + ']' : ''}${t.note ? ' - ' + t.note : ''}`).join('\n')}`;
}

let CHECK = null;  // {stop, done, total, found, cost} while a check runs
function checkProgress() {
  const c = CHECK;
  $('#msg').classList.remove('err');
  $('#msg').innerHTML = c ? `Checking themes: ${c.done} of ${c.total} words, ${c.found} suggestions, about $${c.cost.toFixed(2)} so far. ${c.stop ? 'Stopping after this batch…' : '<button id="stopCheck">Stop</button>'}` : '';
}
async function runCheck(words, effort) {
  const list = playable(), system = checkSystem(list), BATCH = 100;
  const schema = { type: 'object', additionalProperties: false, required: ['results'], properties: { results: { type: 'array', items: {
    type: 'object', additionalProperties: false, required: ['word', 'fits'], properties: { word: { type: 'string' }, fits: { type: 'array', items: {
      type: 'object', additionalProperties: false, required: ['theme', 'how'], properties: { theme: { type: 'integer' }, how: { type: 'string', enum: ['clear', 'arguable'] } } } } } } } } };
  CHECK = { stop: false, done: 0, total: words.length, found: 0, cost: 0 };
  let err = null;
  try {
    for (let i = 0; i < words.length && !CHECK.stop; i += BATCH) {
      checkProgress();
      const chunk = words.slice(i, i + BATCH);
      const r = await claude('Words, each followed by the themes it is already in:\n' + chunk.map(w => `${w.t} - ${w.th.map(t => theme(t) ? theme(t).name : '').join('; ')}`).join('\n'),
        schema, 16000, { system, effort });
      CHECK.cost += lastCost;
      const byText = new Map(chunk.map(w => [w.t.toLowerCase(), w]));
      for (const res of r.results) {
        const w = byText.get(String(res.word).toLowerCase());
        if (!w) continue;
        const rel = related(w);
        for (const f of res.fits) {
          const t = list[f.theme];
          if (!t || rel.has(t.id) || (w.x || []).includes(t.id)) continue;
          (w.sg ||= {})[t.id] = f.how === 'clear' ? 'c' : 'a';
          CHECK.found++;
        }
      }
      for (const w of chunk) w.ck = true;
      CHECK.done += chunk.length;
      changed(); render();
    }
  } catch (e) { err = e; }
  const c = CHECK;
  CHECK = null;
  render();
  checkProgress();
  status(`${err ? 'Check stopped by an error: ' + err.message + '. ' : c.stop ? 'Check stopped. ' : 'Check finished. '}Checked ${c.done} of ${c.total} words, ${c.found} suggestions to review, about $${c.cost.toFixed(2)}.`, !!err);
}

function checkDialog() {
  if (CHECK) return;
  const t = UI.sel && theme(UI.sel), all = Object.values(P.words);
  const inT = t ? all.filter(w => w.th.some(x => desc(t.id).has(x))) : [];
  const opts = [];
  if (t) opts.push(['themeNew', `In "${t.name}" and its sub-themes, not yet checked (${inT.filter(w => !w.ck).length})`], ['theme', `In "${t.name}" and its sub-themes, all (${inT.length})`]);
  opts.push(['new', `Every word not yet checked (${all.filter(w => !w.ck).length})`], ['all', `Every word, again (${all.length})`]);
  dialog('Check words against other themes', `<p>Claude looks at each word's other meanings and lists the other themes it fits: <b>clear</b> fits (the word could be used there) and <b>arguable</b> ones (a player might think it belongs). Nothing changes until you review the suggestions.</p>`
    + field('Words to check', `<select id="ck-s">${options(opts, opts[0][0])}</select>`)
    + field('Effort', `<select id="ck-e">${options([['low', 'Low: cheaper and faster'], ['medium', 'Medium: more thorough']], 'medium')}</select>`)
    + `<p class="muted">Batches of 100 words, each sent with the list of all ${playable().length} playable themes (cached, so repeats are cheap). Model: ${esc(SET.model)}. The running cost is shown under the theme name, and you can stop at any time.</p>`,
    [['Close', () => { }], ['Start', d => {
      const k = val(d, '#ck-s');
      const words = k === 'theme' ? inT : k === 'themeNew' ? inT.filter(w => !w.ck) : k === 'new' ? all.filter(w => !w.ck) : all;
      if (!words.length) { status('No words to check.'); return false; }
      if (!sessionKey) { status('Add your Anthropic API key in Settings first.', true); return false; }
      runCheck(words, val(d, '#ck-e'));
    }, 'p']]);
}

// Suggestions waiting for review, for the given words (default: the words in the current theme, or all).
function reviewRows(words) {
  if (!words) words = UI.sel ? Object.values(P.words).filter(w => w.th.some(x => desc(UI.sel).has(x))) : Object.values(P.words);
  const rows = [];
  for (const w of words) if (w && w.sg) for (const [t, k] of Object.entries(w.sg)) if (theme(t)) rows.push({ w, t, k });
  return rows.sort((a, b) => form(a.w).localeCompare(form(b.w)) || a.k.localeCompare(b.k));
}
function applySuggestion(w, t, v) {
  if (v === 'c') { if (!w.th.includes(t)) w.th.push(t); if (w.x) w.x = w.x.filter(x => x !== t); }
  if (v === 'a' && !w.th.includes(t)) { w.x ||= []; if (!w.x.includes(t)) w.x.push(t); }
  delete w.sg[t];
  if (!Object.keys(w.sg).length) delete w.sg;
}
function reviewDialog(words) {
  const rows = reviewRows(words), page = rows.slice(0, 300);
  const body = !page.length ? '<p>No suggestions waiting here.</p>'
    : `<p class="muted"><b>Link</b>: the word joins that theme and can be used for it. <b>Clash</b>: the word is kept out of any level with that theme. <b>Ignore</b>: drop the suggestion.</p>`
    + `<div class="row"><span>Set all to:</span><button data-all="c">Link</button><button data-all="a">Clash</button><button data-all="i">Ignore</button><button data-all="s">As suggested</button></div>`
    + `<table class="rv"><tr><th>Word</th><th>Other theme</th><th>Link</th><th>Clash</th><th>Ignore</th></tr>`
    + page.map((r, i) => `<tr><td>${esc(form(r.w))}<br><small class="muted">${esc(r.w.th.map(t => theme(t) ? theme(t).name : '').join(', '))}</small></td>`
      + `<td title="${esc(pathOf(r.t))}">${esc(theme(r.t).name)} <small class="muted">${r.k === 'c' ? 'clear' : 'arguable'}</small></td>`
      + ['c', 'a', 'i'].map(v => `<td><input type="radio" name="rv${i}" value="${v}" data-k="${r.k}"${r.k === v ? ' checked' : ''}></td>`).join('') + '</tr>').join('')
    + '</table>' + (rows.length > page.length ? `<p class="muted">Showing ${page.length} of ${rows.length}. Apply to see the rest.</p>` : '');
  dialog(`Review suggestions (${rows.length})`, body, [['Close', () => { }], ...(page.length ? [['Apply', d => {
    page.forEach((r, i) => applySuggestion(r.w, r.t, d.querySelector(`input[name="rv${i}"]:checked`).value));
    changed(); render();
    if (reviewRows(words).length) { reviewDialog(words); return false; }
    setTimeout(() => status(`Applied ${page.length} suggestion${page.length === 1 ? '' : 's'}.`));
  }, 'p']] : [])], d => {
    d.querySelectorAll('[data-all]').forEach(b => b.onclick = () => {
      d.querySelectorAll('table.rv input[type=radio]').forEach(r => { r.checked = r.value === (b.dataset.all === 's' ? r.dataset.k : b.dataset.all); });
    });
  });
}

// Other themes sharing words with this one (links or clashes), most first.
function overlapHtml(id) {
  const D = pool(id), skip = new Set([...D, ...(ix().anc[id] || [])]), n = {};
  for (const w of Object.values(P.words)) {
    if (!w.th.some(t => D.has(t))) continue;
    for (const t of new Set([...w.th, ...(w.x || [])])) if (!skip.has(t)) n[t] = (n[t] || 0) + 1;
  }
  const top = Object.entries(n).sort((a, b) => b[1] - a[1]).slice(0, 6);
  return top.length ? 'Shares words with: ' + top.map(([t, c]) => `<a data-goto="${t}" title="${esc(pathOf(t))}">${esc(theme(t).name)}</a> (${c})`).join(' · ') : '';
}

// ---------- events ----------

let shownIds = [];
function snapshot(label) { undoSnap = { data: serialize(), label }; }
function deleteWords(ids) { snapshot('delete'); for (const id of ids) { delete P.words[id]; PICK.delete(id); } changed(); }
// Unlinks words from the selected theme (and its sub-themes when they are shown). Returns how many were deleted for having no theme left.
function unlinkWords(ids) {
  snapshot('remove');
  const drop = UI.sub ? pool(UI.sel) : new Set([UI.sel]);
  let gone = 0;
  for (const id of ids) {
    const w = P.words[id];
    if (!w) continue;
    w.th = w.th.filter(t => !drop.has(t));
    if (!w.th.length) { delete P.words[id]; gone++; }
    PICK.delete(id);
  }
  changed();
  return gone;
}

function select(id) {
  if ((id || null) !== UI.sel) PICK.clear();
  UI.sel = id || null;
  if (id) reveal(id);
  limit = 500;
  $('#q').value = '';
  if (!$('#msg').classList.contains('err')) $('#msg').textContent = '';
  render();
}

document.addEventListener('click', async e => {
  const pk = e.target.closest('input[data-pick]');
  if (pk) {
    const id = pk.dataset.pick, on = pk.checked;
    let ids = [id];
    if (e.shiftKey && lastPick && shownIds.includes(lastPick)) {
      const a = shownIds.indexOf(lastPick), b = shownIds.indexOf(id);
      ids = shownIds.slice(Math.min(a, b), Math.max(a, b) + 1);
    }
    for (const i of ids) on ? PICK.add(i) : PICK.delete(i);
    lastPick = id;
    renderMain();
    return;
  }
  const el = e.target.closest('[data-tog],[data-add],[data-ren],[data-del],[data-sel],[data-goto],[data-word],[data-review],[data-sel-crumb],th[data-sort],button');
  if (!el || el.closest('dialog')) return;
  const ds = el.dataset;
  if (ds.tog) { UI.exp[ds.tog] = !UI.exp[ds.tog]; render(); }
  else if (ds.add) { const n = await newThemeBox(ds.add); if (n) select(makeTheme(n.name, ds.add, { group: n.group })); }
  else if (ds.ren) { const n = await ask('Rename theme', theme(ds.ren).name); if (n) { theme(ds.ren).name = n; changed(); render(); } }
  else if (ds.del) { if (await confirmBox(`Delete "${theme(ds.del).name}" and its sub-themes? Words left with no theme are removed.`)) { deleteTheme(ds.del); render(); } }
  else if (ds.sel) select(UI.sel === ds.sel ? null : ds.sel);
  else if (ds.goto) select(ds.goto);
  else if (ds.selCrumb !== undefined) select(ds.selCrumb);
  else if (ds.word) wordDialog(ds.word);
  else if (ds.review) reviewDialog([P.words[ds.review]]);
  else if (ds.rm) { const w = P.words[ds.rm]; deleteWords([ds.rm]); render(); status(`Deleted "${form(w)}".`); }
  else if (ds.sort) { UI.dir = UI.sort === ds.sort ? -UI.dir : (ds.sort === 'z' ? -1 : 1); UI.sort = ds.sort; render(); }
  else switch (el.id) {
    case 'expall': P.themes.forEach(t => UI.exp[t.id] = true); render(); break;
    case 'colall': UI.exp = {}; render(); break;
    case 'lock': UI.unlock = !UI.unlock; render(); break;
    case 'addroot': { const n = await newThemeBox(null); if (n) select(makeTheme(n.name, null, { group: n.group })); break; }
    case 'genWords': genWordsDialog(); break;
    case 'checkBtn': checkDialog(); break;
    case 'reviewBtn': reviewDialog(); break;
    case 'stopCheck': if (CHECK) { CHECK.stop = true; checkProgress(); } break;
    case 'genSubs': genSubsDialog(); break;
    case 'addWords': addWordsDialog(); break;
    case 'themeSet': themeDialog(); break;
    case 'setBtn': case 'setBtn2': settingsDialog(); break;
    case 'spell': SET.spelling = SET.spelling === 'UK' ? 'US' : 'UK'; render(); break;
    case 'dataBtn': dataDialog(); break;
    case 'showMore': limit += 1000; renderMain(); break;
    case 'selEna': case 'selDis': for (const id of PICK) P.words[id].on = el.id === 'selEna'; changed(); render(); break;
    case 'selNone': PICK.clear(); renderMain(); break;
    case 'selDel': {
      const n = PICK.size;
      if (await confirmBox(`Delete ${n} word${n === 1 ? '' : 's'} from every theme they are in?`)) { deleteWords([...PICK]); render(); status(`Deleted ${n} word${n === 1 ? '' : 's'}.`); }
      break;
    }
    case 'selUnlink': {
      const n = PICK.size, gone = unlinkWords([...PICK]);
      render();
      status(`Removed ${n} word${n === 1 ? '' : 's'} from "${theme(UI.sel).name}"${UI.sub ? ' and its sub-themes' : ''}${gone ? `; ${gone} had no other theme and were deleted` : ''}.`);
      break;
    }
    case 'undo': if (undoSnap) { P = deserialize(undoSnap.data); undoSnap = null; PICK.clear(); changed(); fillFreq(); render(); status('Undone.'); } break;
  }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.closest('dialog')) return;
  if (t.dataset.on) { const w = P.words[t.dataset.on]; w.on = t.checked; if (t.checked && w.note && filterReason(w.t) === w.note) w.note = ''; changed(); render(); }
  else if (t.dataset.d !== undefined) { P.words[t.dataset.d].d = t.value ? +t.value : null; changed(); render(); }
  else if (t.id === 'sub') { UI.sub = t.checked; render(); }
  else if (t.id === 'selall') { if (t.checked) shownIds.forEach(i => PICK.add(i)); else PICK.clear(); renderMain(); }
  else if (t.id === 'show') { UI.show = t.value; render(); }
});
$('#q').addEventListener('input', () => { limit = 500; renderMain(); });
$('#find').addEventListener('input', renderFound);

// Dragging themes in the tree (only while unlocked).
let drag = null;
const zone = e => e.target.closest && e.target.closest('[data-sel],#addroot');
const where = (e, r) => { if (r.id === 'addroot') return 'root'; const b = r.getBoundingClientRect(), y = (e.clientY - b.top) / b.height; return y < .28 ? 'before' : y > .72 ? 'after' : 'in'; };
const newParent = (tid, w) => w === 'root' ? null : w === 'in' ? tid : theme(tid).parent;
const canDrop = (id, tid, w) => id && id !== tid && !desc(id).has(newParent(tid, w));
function moveTheme(id, tid, w) {
  const moving = desc(id), block = P.themes.filter(t => moving.has(t.id)), rest = P.themes.filter(t => !moving.has(t.id));
  theme(id).parent = newParent(tid, w);
  let at = rest.length;
  if (w === 'before') at = rest.findIndex(t => t.id === tid);
  else if (w === 'after' || w === 'in') { const tds = desc(tid); at = rest.findIndex(t => t.id === tid); while (at + 1 < rest.length && tds.has(rest[at + 1].id)) at++; at++; }
  rest.splice(at, 0, ...block);
  P.themes = rest;
  if (w === 'in') UI.exp[tid] = true;
  changed();
}
document.addEventListener('dragstart', e => { const r = e.target.closest && e.target.closest('[data-sel]'); if (!r || !UI.unlock) return; drag = r.dataset.sel; e.dataTransfer.setData('text/plain', drag); e.dataTransfer.effectAllowed = 'move'; });
document.addEventListener('dragover', e => {
  const r = zone(e); if (!drag || !r) return;
  const w = where(e, r); r.classList.remove('dz', 'dzt', 'dzb');
  if (canDrop(drag, r.dataset.sel || null, w)) { e.preventDefault(); r.classList.add(w === 'before' ? 'dzt' : w === 'after' ? 'dzb' : 'dz'); }
});
document.addEventListener('dragleave', e => { const r = zone(e); if (r) r.classList.remove('dz', 'dzt', 'dzb'); });
document.addEventListener('drop', e => {
  const r = zone(e); if (!drag || !r) return;
  e.preventDefault();
  const tid = r.dataset.sel || null, w = where(e, r);
  if (canDrop(drag, tid, w)) moveTheme(drag, tid, w);
  drag = null; render();
});
document.addEventListener('dragend', () => { drag = null; render(); });

// ---------- start ----------

function fillFreq() { if (FREQ) for (const w of Object.values(P.words)) if (w.z === undefined) w.z = wordZipf(w); }

(async function start() {
  if (document.documentElement.dataset.v !== VERSION)
    status('This page is out of date in your browser cache. Reload with Ctrl+Shift+R (Cmd+Shift+R on a Mac).', true);
  try {
    const saved = await DB.get('project');
    if (saved) P = deserialize(saved);
    else {
      const old = localStorage.getItem('wlb');
      if (old) { P = fromOldLocal(JSON.parse(old)); scheduleSave(); }
    }
  } catch (e) { status('Could not load the saved project: ' + e.message, true); }
  if (UI.sel && !theme(UI.sel)) UI.sel = null;
  render();
  loadFreq();
})();
