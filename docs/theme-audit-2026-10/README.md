# Theme audit, 2026-10-13

An AI review (one agent per top-level domain, from the library as it stood on 2026-10-13) of all 2,208 playable themes.
The theme ratings and, on 2026-10-14, the structured changes below were applied (duplicates merged, catch-alls grouped, flags set, words fixed or banned, new themes added). Items the reports marked unclear, conditional or "or" were left alone: re-read the audit files for what remains (moves between parents, thin themes, deletions with no clear target).

## What was applied
- `theme-ratings.json`: each playable theme's **recognisability rating**, 1 (everyone sees the group at a glance) to 5 (expert, or too vague to work out from four words). It is now the theme's `difficulty` in `data/wordlist.json` and the three `data/export/*` game files (it replaces the old depth-in-the-tree value, which was only ever 1 or 2). Spread: 1: 239, 2: 653, 3: 728, 4: 424, 5: 164.
- The game's plan decides which rating a level may use (`maxTheme2From` ... `maxTheme5From`).
- Ratings were made from each theme's name and its eight most typical words; they are a first pass and worth spot-checking in the builder (set `Difficulty` in Theme settings to override).

## What is only proposed (one file per domain, `audit-<domain>.md`)
1. **Redundant** themes (merge or delete), including pairs that repeat a theme in another domain.
2. **Silly or unfit** themes (catch-alls, abstract, not family-friendly) and words to ban.
3. **Misplaced** themes and playable themes that should be groups.
4. **Too thin** themes.
5. **Flags**: themes suggested for `sensitive` and `englishOnly`.
6. **Missing themes**: about 230 proposals with 12 to 25 rated words each (some complete new families).

The audits worked from the typical words only, so redundancy calls should be checked against the full word pools before deleting anything.

## Applied 2026-10-14
25 merges, 33 groups, 108 sensitive and 116 English-only flags, 14 adult words, 212 words removed from a theme, 219 new themes with about 3,500 word links (48 duplicate forms folded into existing entries). Not yet run through "Check themes".
