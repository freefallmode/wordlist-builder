"""Checks a generated word batch: python3 tools/check_words.py data/gen/words/batch-NN.json

The batch must cover exactly the themes listed for it in the manifest. Each theme maps to
{"words": [[text, uk, familiarity, zipf10, adult], ...], "flag": "...", "sets": [[...], ...]}
("flag" and "sets" are optional).
"""
import json, os, re, sys

MANIFEST = '/tmp/claude-0/-home-user-word-safari/c0858387-02da-514f-9528-41c06d91da55/scratchpad/wb/manifest.json'
path = sys.argv[1]
name = os.path.basename(path).rsplit('.', 1)[0]
want = json.load(open(MANIFEST))[name]
data = json.load(open(path, encoding='utf-8'))
errors, warns, total = [], [], 0
for t in want:
    if t not in data: errors.append(f'missing theme: {t}')
for t, v in data.items():
    if t not in want: errors.append(f'unexpected theme: {t}'); continue
    if not isinstance(v, dict) or not isinstance(v.get('words'), list): errors.append(f'{t}: needs {{"words": [...]}}'); continue
    seen = set()
    for e in v['words']:
        if not (isinstance(e, list) and len(e) == 5): errors.append(f'{t}: bad entry {e}'); continue
        w, uk, fam, z, adult = e
        if not isinstance(w, str) or not w.strip(): errors.append(f'{t}: empty word'); continue
        if w.lower() in seen: warns.append(f'{t}: duplicate {w}')
        seen.add(w.lower())
        if not re.fullmatch(r"[^\W\d_]+(?:[ -][^\W\d_]+)*", w): warns.append(f'{t}: not letters/space/hyphen: {w!r}')
        if len(re.split(r'[ -]', w)) > 2: warns.append(f'{t}: more than two words: {w!r}')
        if not isinstance(uk, str) or (uk and uk.lower() == w.lower()): errors.append(f'{t}: uk must be "" or a different spelling: {e}')
        if fam not in (1, 2, 3, 4, 5): errors.append(f'{t}: familiarity must be 1-5: {e}')
        if not isinstance(z, int) or not 0 <= z <= 80: errors.append(f'{t}: zipf10 must be an int 0-80: {e}')
        if adult not in (0, 1): errors.append(f'{t}: adult must be 0 or 1: {e}')
        total += 1
    if 'sets' in v:
        for s in v['sets']:
            if len(s) != 4 or any(x.lower() not in seen for x in s): errors.append(f'{t}: each set needs 4 words that are also in "words": {s}')
    if len(v['words']) < 12 and not v.get('flag'): warns.append(f'{t}: only {len(v["words"])} words and no flag')
print(f'{name}: {len(data)} themes, {total} words, {len(errors)} errors, {len(warns)} warnings')
for e in errors[:40]: print('ERROR', e)
for w in warns[:40]: print('warn ', w)
sys.exit(1 if errors else 0)
