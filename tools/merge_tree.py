"""Merges data/gen/tree-<group>.txt into data/themes.txt and checks the result.

Checks: unique theme names, valid tags, depth, at least 6 children under each
depth-1 theme, and counts per group and per region.
"""
import collections, json, os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), '..')
GROUPS = ['Food & Drink', 'Animals', 'Nature & Earth', 'Places & Geography', 'Travel & Transport', 'Body & Health',
          'People & Society', 'Home & Everyday', 'Sports & Games', 'Arts & Entertainment', 'History & Myth',
          'Science & Tech', 'Language & Wordplay', 'Qualities']
REGIONS = {'africa', 'middle east', 'turkey', 'asia', 'oceania', 'antarctica', 'south america', 'north america', 'europe'}
KINDS = {'place', 'property', 'wordplay'}
slug = lambda g: re.sub(r'[^a-z0-9]+', '-', g.lower()).strip('-')

def parse(line):
    body, note = (line.split(' -- ', 1) + [''])[:2]
    tags = re.findall(r'\[([^\]]+)\]', body)
    name = re.sub(r'\s*\[[^\]]+\]', '', body).strip()
    group = name.endswith(':')
    return name.rstrip(':').strip(), group, tags, note.strip()

out, problems = [], []
names = collections.Counter()
stats = collections.OrderedDict()
regions = collections.Counter()
for g in GROUPS:
    path = os.path.join(ROOT, 'data', 'gen', f'tree-{slug(g)}.txt')
    if not os.path.exists(path):
        problems.append(f'missing {path}'); continue
    out.append(g + ':')
    playable = groups = 0
    kids = collections.OrderedDict(); mid = None
    for raw in open(path, encoding='utf-8'):
        line = raw.rstrip('\n').replace('\t', '  ')
        if not line.strip() or line.strip().startswith('#'): continue
        ind = len(line) - len(line.lstrip(' '))
        if ind % 2 or ind < 2 or ind > 6:
            problems.append(f'{g}: bad indent {ind}: {line.strip()}'); continue
        name, group, tags, note = parse(line.strip())
        names[name.lower()] += 1
        for t in tags:
            k, _, v = t.partition(':')
            if k == 'region':
                if v.strip().lower() not in REGIONS: problems.append(f'{g}: bad region {t} on {name}')
                else: regions[v.strip()] += 1
            elif k not in KINDS and k != 'adult': problems.append(f'{g}: bad tag [{t}] on {name}')
        if group: groups += 1
        else: playable += 1
        if ind == 2: mid = name; kids[mid] = 0
        elif ind == 4 and mid: kids[mid] += 1
        order = lambda t: (0 if t in KINDS else 1 if t.startswith('region') else 2)
        tagtxt = ''.join(f' [{t}]' for t in sorted(tags, key=order))
        out.append(' ' * ind + name + (':' if group else '') + tagtxt + (' -- ' + note if note else ''))
    thin = [k for k, c in kids.items() if c < 6]
    if thin: problems.append(f'{g}: depth-1 themes with under 6 children: {thin}')
    stats[g] = (playable, groups, len(kids))
dups = [n for n, c in names.items() if c > 1]
if dups: problems.append(f'duplicate names: {dups}')
open(os.path.join(ROOT, 'data', 'themes.txt'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
for g, (p, gr, k) in stats.items(): print(f'{g:22} playable {p:4}  groups {gr:3}  depth-1 {k:3}')
print('total playable', sum(s[0] for s in stats.values()), ' lines', len(out))
print('regions', dict(regions))
print('problems:', len(problems)); [print(' -', p) for p in problems]
