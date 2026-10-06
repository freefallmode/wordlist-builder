"""Marks the themes listed under "separate" in data/gen/words/*.extra.json with [separate]
in data/gen/tree-*.txt. A theme whose parent is a group (not playable) is skipped, since
the flag only matters for a playable parent. Run tools/merge_tree.py afterwards."""
import glob, json, os, re

ROOT = os.path.join(os.path.dirname(__file__), '..')
want = set()
for p in glob.glob(os.path.join(ROOT, 'data', 'gen', 'words', '*.extra.json')):
    want |= {n.strip().lower() for n in json.load(open(p, encoding='utf-8')).get('separate', [])}
found, changed, skipped = set(), 0, set()
for p in glob.glob(os.path.join(ROOT, 'data', 'gen', 'tree-*.txt')):
    out, stack = [], []  # stack of (indent, is_group) for the ancestors of the current line
    for line in open(p, encoding='utf-8').read().split('\n'):
        body = line.split(' -- ', 1)[0]
        name = re.sub(r'\s*\[[^\]]+\]', '', body).strip().rstrip(':').strip().lower()
        ind = len(line) - len(line.lstrip(' '))
        while stack and stack[-1][0] >= ind:
            stack.pop()
        parent_group = bool(stack) and stack[-1][1]
        if body.strip():
            stack.append((ind, re.sub(r'\s*\[[^\]]+\]', '', body).rstrip().endswith(':')))
        if name in want and parent_group:
            found.add(name); skipped.add(name)
            if '[separate]' in body:
                line = line.replace(' [separate]', '')
        elif name in want:
            found.add(name)
            if '[separate]' not in body:
                head, sep, note = line.partition(' -- ')
                line = head.rstrip() + ' [separate]' + (sep + note if sep else '')
                changed += 1
        out.append(line)
    open(p, 'w', encoding='utf-8').write('\n'.join(out))
print(f'{len(want)} themes listed, {changed} newly marked, {len(skipped)} skipped (parent is a group), '
      f'not found: {sorted(want - found)}')
