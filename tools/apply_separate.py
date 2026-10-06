"""Marks the themes listed under "separate" in data/gen/words/*.extra.json with [separate]
in data/gen/tree-*.txt. Run tools/merge_tree.py afterwards."""
import glob, json, os, re

ROOT = os.path.join(os.path.dirname(__file__), '..')
want = set()
for p in glob.glob(os.path.join(ROOT, 'data', 'gen', 'words', '*.extra.json')):
    want |= {n.strip().lower() for n in json.load(open(p, encoding='utf-8')).get('separate', [])}
found, changed = set(), 0
for p in glob.glob(os.path.join(ROOT, 'data', 'gen', 'tree-*.txt')):
    out = []
    for line in open(p, encoding='utf-8').read().split('\n'):
        body = line.split(' -- ', 1)[0]
        name = re.sub(r'\s*\[[^\]]+\]', '', body).strip().rstrip(':').strip().lower()
        if name in want:
            found.add(name)
            if '[separate]' not in body:
                head, sep, note = line.partition(' -- ')
                line = head.rstrip() + ' [separate]' + (sep + note if sep else '')
                changed += 1
        out.append(line)
    open(p, 'w', encoding='utf-8').write('\n'.join(out))
print(f'{len(want)} themes listed, {changed} newly marked, not found: {sorted(want - found)}')
