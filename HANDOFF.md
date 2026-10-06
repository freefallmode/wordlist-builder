# Wordlist Builder: handoff notes

## Purpose

Builds the theme tree and wordlists for Word Safari (a word-sorting puzzle: words on balloons, four per theme, no word may fit two themes in one level). The output feeds an offline level generator and the game. Themes are hierarchical (food > fruits > citrus fruits), and a word can belong to several themes.

## Running

Static files, no build. Hosted on GitHub Pages from `main`. Locally, serve the folder over HTTP (`python3 -m http.server`); opened as `file://` the frequency list cannot load.

## Releasing changes

GitHub Pages lets browsers cache files for about 10 minutes. Bump the version in three places on every change: `data-v` and the two `?v=` links in `index.html`, and `VERSION` in `app.js`. The app warns if the page and script versions differ.

## Layout

- Left pane: search (words and themes), theme tree with on/total word counts, Import / export…, Settings….
- Right pane: the selected theme's words, including sub-themes (toggle). Sort by word, length, frequency, difficulty or number of themes. Click a word to see and edit its linked themes. Buttons: Generate words…, Generate sub-themes…, Add words…, Theme settings….
- Import / export holds everything else: project files, the theme tree file, the game and CSV exports, and maintenance.

## Claude

Called straight from the browser (`anthropic-dangerous-direct-browser-access`). The API key is entered in Settings and kept for the session only, unless "remember" is ticked (then it is in localStorage). Models: Claude Opus 5.5 (default), Sonnet 5.5, Haiku 4.5. Requests use structured outputs (`output_config.format` with a JSON schema) so replies are always valid JSON, effort `medium`, and on Opus/Sonnet `fallbacks: "default"` (beta `server-side-fallback-2026-07-01`) so a classifier decline is retried on another model. Generate sub-themes shows suggestions with example words for picking before anything is added.

## Frequency and difficulty

- Frequency is stored as a Zipf value: log10 of occurrences per billion words. 7 is "the", 5 to 6 everyday words, 4 common, 3 uncommon, 2 rare, under 1.5 not in the list. Looked up in `data/freq-en.txt` (wordfreq "large" English list, single letter-only words down to Zipf 1.5, about 170k words). Phrases combine like wordfreq: 1/f = sum of 1/f_i.
- Difficulty 1 to 5 is "auto" from Zipf (`autoDiff` in `app.js`: 4.8, 4.0, 3.3, 2.6 cut points) unless set by hand. Frequency is not familiarity (kiwi is rarer in text than it is unfamiliar, and homographs like mercury or apple are inflated), so hand overrides matter.
- Theme difficulty defaults to depth in the tree (groups not counted), or is set by hand.

## Theme check

"Check themes…" sends words in batches of 100 to Claude with the numbered list of every playable (non-group) theme as a cached system prompt, and asks which other themes each word fits: "clear" (a fair member) or "arguable" (a player could think so). Fits to the word's own themes and their parents are dropped. Results are stored as suggestions; "Review suggestions" turns each into a link (word joins the theme), a clash, or nothing. The cost so far is computed from the usage the API returns (prices in `PRICE` in `app.js`). The theme header lists the themes sharing the most words (links or clashes) with the selected one: the confusable pairs.

## Data model (in memory)

```js
P = {
  themes: [{ id, name, label, parent, group, kind, region, d, note, wd, cn, dm }],  // display order
  words:  { [slug]: { t, uk, th: [themeId], on, z, d, src: ['L','M','W','C','D'], note } },
}
```
- Theme `id` is a slug of the name at creation and never changes on rename (levels and translations will refer to it).
- `kind`: '' (category), 'place' (things found at a place), 'property' (things sharing a property), 'wordplay'.
- `region`: '' or one of Africa, Middle East (including Turkey), Asia, Oceania, Antarctica, South America, North America, Europe. Acts: 1 Turkey / Middle East / Africa, 2 Asia, 3 Oceania, 4 Antarctica, 5 South America, 6 North America, 7 Europe / Turkey.
- `adult`: not family-friendly; inherited by everything under it. Settings → "Family-friendly game file" leaves adult themes and words out of the game export.
- `group`: a container for browsing, never a playable theme.
- `label`: the name shown in the game when it differs from `name`.
- Word `t` is the American spelling (capitals kept for proper nouns such as Paris or Plato); `uk` is the British spelling when it differs. The key is a lowercase slug of `t`. The Spelling setting (toolbar toggle) picks which form is shown and written to the game file; search and duplicate checks use both. Import / export → "Find British spellings" asks Claude to fill in `uk` for older words.
- Word `fam`: `{themeId: 1..5}` familiarity of the word as a member of that theme (1 everyone, 5 specialists). Difficulty in a theme is: set by hand (`d`), else familiarity there, else from Zipf. `ze`: estimated Zipf, used only when the word is not in the frequency list (shown with ~). `adult`: word not family-friendly.
- Word `x`: clashes, themes a player might think the word belongs to; the level generator must never put the word in a level with them. `ck`: the word has been through the theme check. `sg`: suggestions from the check awaiting review, `{themeId: 'c' (clear fit) | 'a' (arguable)}`.
- Word `z`: Zipf (the higher of the two spellings), `null` if rarer than the list, `undefined` if not looked up yet. `d`: null means auto.

## File formats

Project file and IndexedDB autosave (`schema: 2`), compact: theme rows are arrays described by `themeFields`; word rows by `wordFields`; words refer to themes by **index** in the themes array. Zipf is stored times ten (0 = rarer than the list, -1 = unknown). Sources are one letter each (L llm, M manual; W, C, D are Wikidata, ConceptNet and Datamuse from older versions). Opening a schema 1 file (the first version) converts it; the first version's localStorage data (`wlb`) is migrated on first load.

Game file (Import / export → Game file): minified, enabled words only, `v: 1`, `spelling: "US" | "UK"`. `themes: [id, name, label, parentIndex (-1 = top), group, kind, region, difficulty]`, `v: 2`, `familyFriendly`. `themes: [id, name, label, parentIndex (-1 = top), group, kind, region, difficulty, adult]`, `words: [text, zipf10, [themeIndex…], [difficulty per theme…], [clashThemeIndex…], otherSpelling?]` where `text` is in the chosen spelling.

Theme tree file (`data/themes.txt`; Import / export → Add starter theme tree, Import / Export theme tree): two spaces per level; a group has `:` right after its name; optional tags `[place]` `[property]` `[wordplay]` `[region:Asia]` `[adult]`; optional ` -- note` at the end, e.g. `___ball [wordplay] -- words that come before ball`.

## Word filters

Single words 3 to 12 letters; two-word names (shown on two lines in the game) up to 20 letters in total and 12 per word; more than two words is rejected. Filters only mark words disabled with a reason, never delete.

## Known gaps and next steps

- The theme check only knows themes that exist when it runs; after adding themes, re-check (or check "every word, again").
- Confusable theme pairs are shown but not stored; the level generator can compute them from links and clashes.
- No plural merging, and only US/UK spelling pairs (not other variants such as donut/doughnut in the same dialect).
- No profanity list by default.
- Multi-language: theme ids are stable, words are not yet keyed by concept.
