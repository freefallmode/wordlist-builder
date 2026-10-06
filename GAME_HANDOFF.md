# Word Safari: handover for the level design and game work

Read this first. It covers what the word data is, what has been decided, and everything planned but not built.
Written at the end of the session that built the word library; the next session continues from here.

## The two repos

- **freefallmode/word-safari** (Unity 6 game; read its `CLAUDE.md`). Development branch:
  `claude/word-themes-difficulty-khlqtf`. No game code has changed for anything in this note yet.
- **freefallmode/wordlist-builder** (this repo; web app at https://freefallmode.github.io/wordlist-builder/).
  Builds the theme tree and word library. `README.md` and `HANDOFF.md` describe the app and its formats.

## The data

**Final figures:** 2,208 playable themes (2,287 with folders), 79,089 words (after merging 833 singular/plural
pairs), 170,043 word-theme links, about 33,500 clashes; 3,870 words and 55 themes flagged as trademarks or
copyrighted names. Game files: full 74,746 words (5.0 MB); family-friendly 2,235 themes, 72,975 words; without
trademarks 2,226 themes, 70,995 words.

| File | What it is |
|---|---|
| `data/themes.txt` | The theme tree as an indented outline (format in `HANDOFF.md`). 14 groups, 2,208 playable themes. |
| `data/wordlist.json` | The starter library: every theme, word and word datum. Opens in the app (Import / export → Load starter library). |
| `data/export/wordlist-game.json` | Game file, every word. |
| `data/export/wordlist-game-family.json` | Game file, family-friendly (adult themes and words left out). |
| `data/export/wordlist-game-no-trademarks.json` | Game file without trademarked and copyrighted names. |
| `data/gen/words/plurals.json`, `trademarks.json` | Plural merges and clash pairs; trademark flags per word and theme. |
| `data/gen/words/batch-NN.json` | Generated words per batch: `{theme: {"words": [[text, uk, familiarity, zipf10, adult]], "flag", "sets"}}`. |
| `data/gen/words/batch-NN.extra.json` | Clean-up record per batch: separate sub-themes, removed words, notes. |
| `data/gen/words/batch-NN.links.json` | Cross-theme check per batch: `{text: {"also": [[theme, familiarity]], "clash": [theme]}}`. |

Rebuild: `python3 tools/merge_tree.py` (tree) then `python3 tools/build_wordlist.py` (library); the game files
are exported from the app (Import / export → Export game file; Settings → Family-friendly game file).

### Game file (v5)

```
{ v: 5, generated, spelling: "US"|"UK", familyFriendly, trademarks,
  themeFields: [id, name, label, parent, group, kind, region, difficulty, adult, separate, trademark],
  themes: [...rows],               // parent is an index into themes, -1 for top level
  wordFields: [text, balloonText, zipf10, themes, difficultyPerTheme, clashes, otherSpelling, formsPerTheme, anagramSet, trademarkIn],
  words: [...rows] }
```

- `text`: the word as written (accents, apostrophes, periods, digits, capitals): `crème brûlée`, `Rubik's Cube`, `Apollo 11`.
- `balloonText`: `text` with accents folded to plain letters (ı → i, ß → ss, ø → o …). What goes on a balloon.
- `zipf10`: Zipf frequency × 10 (0 = rarer than the list). Multi-word names use an estimate.
- `themes`: indices of every theme the word belongs to (its own themes plus the cross-check's "also" links).
- `difficultyPerTheme`: 1 (everyone) to 5 (specialists), parallel to `themes`. This is per theme: Mercury is
  easy as a planet, harder as an element.
- `clashes`: theme indices a player could wrongly think the word belongs to. **Never put the word in a level
  with any of these themes.**
- `otherSpelling`: the other dialect's spelling when it differs (`color` / `colour`).
- `trademarkIn`: theme indices where the word is a trademark or copyrighted name (brand, team, title, character):
  Rebecca is one in classic novels but not in girls' names. The theme field `trademark` marks themes that are almost
  all trademarks (car brands, nfl teams, video games); it is inherited by sub-themes. With Settings → "Include
  trademarked and copyrighted names" unticked, the export leaves out those themes and drops each word from its
  trademark themes, turning them into clashes instead (`trademarks: false` in the file).
- `anagramSet`: for "anagrams of each other", the set number (words with the same number are one set of four); 0 otherwise.
- `formsPerTheme`: `[[themeIndex, form, plainForm]]` where a theme writes the word differently (capitals: `Mercury`
  the planet, `mercury` the metal).

### What the theme fields mean for levels

- `group = 1`: a browsing folder, never a theme in a level.
- `kind`: `''` category (Fruit), `place` (things found at a place: the airport), `property` (things that are red),
  `wordplay` (`___ball`, hidden words, homophones, palindromes).
- `region`: Africa, Middle East (includes Turkey), Asia, Oceania, Antarctica, South America, North America, Europe.
- `separate = 1`: the sub-theme's words do **not** count as members of the parent (christmas words are not
  "holidays and events"; apple varieties like Rome or Jazz are not "fruits" alone). A playable parent's word pool
  is its own words plus its non-separate sub-themes, recursively.
- `difficulty`: theme difficulty, depth in the tree unless set by hand.
- `adult`: not family-friendly; inherited by everything below.

### Data caveats the level builder must handle

- **A word in a sub-theme also belongs to the parent theme** (and further up), unless the sub-theme is `separate`.
  `themes` lists only direct memberships, so the checker must expand each word's themes upward through
  non-separate parents before testing a level.
- **Words that are a theme's own name** (fruit, pharmacy, circus) were recorded as clashes with that theme where
  found. Add a rule anyway: never show a word in a level with a theme whose name or label it equals.
- **Heavily overlapping theme pairs** exist on purpose (airport / airport words, symptoms / common illnesses,
  sight words / ways of looking, rooms of the house, sibling army and navy themes). Clashes keep them apart; a
  theme-pair overlap score computed from shared words would let the generator skip such pairs quickly.
- **Singular and plural are one word** where they mean the same thing (apple shows as "apples" in signs of autumn
  through `formsPerTheme`); `data/gen/words/plurals.json` lists the merges and the clash pairs (scales, chips).
  Pairs that are different words (jeans, team names) stay separate, so the checker must also reject a level showing
  two words that differ only by a plural ending (apple/apples, mouse/mice).
- **Words are keyed by lowercase, accent-folded text**, so homographs are one word with several themes (date: fruit and
  calendar; Soho: London district and space telescope). Correct for the "no word fits two themes" rule.
- **Spelling-based themes** (double letters, hidden words, palindromes, no vowels, sounds like a letter …) are only
  partly listed; hundreds of words qualify by spelling alone. The checker should test these by rule on every word
  on screen, not trust the lists.
- **Names longer than two words** are disabled by the filter (they do not fit a balloon); single words up to 20 letters.
- **"anagrams of each other"** is stored as sets of four (`anagramSet`); a level must use one whole set.
- **Cross-check links come from a model** and were not reviewed by a person. Spot-check before relying on them.
  Some are cautious (Goldfish clashes with pets; every non-English name clashes with girls' and boys' names), and
  links to spelling themes (hidden words, double letters) are generous. Per-batch reports and the scripts that
  built each `batch-NN.links.json` were in the session scratchpad and are not kept; the links files are final.
- Thin themes kept on purpose: "names that are months" (6 words), "sounds like a number" (10).

## Decisions made by Simon

- **Structure:** 7 acts, 60 stops (9, 9, 9, 6, 8, 9, 10), cycled in the same order after the last.
  Acts by region: 1 Middle East (with Turkey) / Africa, 2 Asia, 3 Oceania, 4 Antarctica, 5 South America,
  6 North America, 7 Europe (with Turkey). Each act's levels should lean on its region's themes.
- Landscapes and music are being made separately.
- **Lives and hints span levels** (not reset per level).
- **In-app purchases later**; localisation maybe later (decide early: every language means a new word database).
- **Content:** no censoring, but family-friendly flag per theme and word plus a master export setting.
  No trademarked fiction from films, TV, comics or cartoons. Allowed: video and tabletop game titles and characters,
  single novels (also those still under copyright), public-domain fiction, real people, brands and toy lines.
- Themes that overlap across groups are kept (they become clashes, and confusable pairs are useful for hard levels).
- American spelling by default, British stored too; a setting picks which.

## The difficulty plan (discussed and agreed in principle; nothing built)

### 1. Difficulty is several separate dials

Give each level a target score and turn only one or two dials between neighbouring levels.

| Dial | Easy end | Hard end |
|---|---|---|
| Themes per level | 2 | 10 to 20, using the queue |
| Balloons on screen at once | all of them | capped, the rest queued |
| Word obscurity | Apple, Lion | Kumquat, Okapi |
| Theme specificity | Sports | Racket sports, then badminton terms |
| How close the themes are | Fruit + Animals | Racket sports + Water sports in the same level |
| Red herrings | none | words that seem to fit another theme on screen but don't (Mercury with Metals but no Planets) |
| Theme type | category (Fruit) | property ("things that are red"), then wordplay ("___ball": Foot, Snow, Eye, Basket) |
| Tries | generous | tight |

- **Sawtooth, not a ramp:** hard, then easier, then harder again. The every-5-levels reward is the natural easy level.
- **New mechanics arrive on easy levels:** fewer themes and common words, so the player learns one thing at a time.
- **The screen sets a hard cap:** about 16 to 20 balloons stay readable on a phone. 10 to 20 themes needs the queue
  to meter them in and finished themes to shrink or leave (meta-merge, or a finished family floating off the top).

The data supports the dials directly: familiarity per theme (obscurity), tree depth (specificity), siblings and
clashes (closeness, red herrings), `kind` (theme type).

### 2. Content pipeline

- **Theme tree with word pools** (done: this library). Each level picks 4 words from a theme's pool, so themes
  return later with different words.
- **Difficulty per word** (done: familiarity per theme, Zipf as a check). Hand correction still to do.
- **Offline level generator and checker** (to build): pure C# like `Scripts/Core`, no UnityEngine. Picks themes
  for a target difficulty and region, picks words, and rejects any level where a word on screen fits or clashes
  with another theme on screen (including spelling-based themes tested by rule, and half-word pairings below).
- **Fixed levels shipped as data**, not generated at run time: everyone's level 412 is the same and individual
  levels can be tuned.

### 3. Mechanics

**Hint button.** Never reveals a theme's name (the name is the reward). Pulses two balloons that belong together,
preferring a group the player has started. Never costs a try. A stronger second hint could fly a matching balloon
into place. Hints are a currency that is earned (and later sold).

**Every 5 levels, a spare life and a hint.** The life is a banked spare try: when the player would fail, it is used
automatically and the level carries on. Tries should scale with level size instead of a flat 5 (`GameModel.MaxTries`),
for example `3 + themes / 2`. Hints and spare tries are what in-app purchases would sell.

**Themes merge into their parent (from mid Act 1).** Finished themes combine into the parent theme; also frees space.
- **Decided:** only in later levels, and only occasionally. A family needs at least 4 sub-themes of one parent in the
  level. Within such a level, merging is how the parent name is revealed (a second reward).
- Size: combined balloons are already 1.45×; a 2× parent would clutter. Keep the parent the same size with a ring or
  badge for its tier, or let it float away when complete.
- Dropping a finished theme onto an unrelated one is a wrong drop.
- **Decided:** drop the "Combine themes" setting (`GameModel.CombineCompleted`); finished themes always combine.
- Data: parent = `parent` index; only non-separate children belong to a parent.

**Half-word balloons (from Act 2).** E.g. PUMP– + –KIN.
- **Decided: try envelope and basket first.** One half rides on a balloon envelope, the other on a basket standing on
  the ground; joining them assembles the balloon. Check text size on phones; the fallback is `PUMP–` / `–KIN` on
  balloons with a stitched seam on the joining side. (Earlier note: one half
  on the envelope, the other on the basket (charming, but small text on phones).
- Joining makes an ordinary pale solo balloon, which is then sorted as usual. Halves join only with each other.
- Difficulty inside the mechanic: halves that aren't words (MAN–GO, ZEB–RA); halves that are words (PUMP–KIN,
  EAR–WIG); misleading halves (BUTTER–FLY in a level with Food, CAR–PET with Transport).
- Only intended pairs join. The checker rejects levels where another pairing of halves on screen also spells a real
  word (CAR+ROT next to CAR+PET). A wrong pairing bounces and costs nothing at first.
- Queue: both halves must arrive close together, and `CanMerge()` must count an available half-pair as a valid move,
  or the queue stalls (it releases balloons only after a merge or when no valid merge exists).
- Later variant: the shared half is the hidden link (BUTTER–, DRAGON–, FIRE– all completing with –FLY).
- Needs a split list: which words split where, and whether each half is a word. Not in the library yet.

## Tasks for the next session, in order

1. Read `word-safari/CLAUDE.md`; if the game has not yet been run in the Unity editor, that comes first.
2. Agree the level data format (fixed levels as data) and the dial scores per level across the 60 stops and the cycle.
3. Build the offline generator and checker in pure C# (`Scripts/Core`, tested outside Unity) that reads the game file.
4. Load levels from data in `LevelData` / `GameModel` instead of the hand-written levels.
5. Tries scaled to level size; banked spare try and hint currency that persist across levels (needs saved progress).
6. Hint button.
7. Theme families (meta-merge) and the combine-setting decision.
8. Half-word balloons: split list (generate in the builder), rendering, joining, checker rules, queue rule.
9. Export additions: split data for half-word balloons; anything else the generator needs.
10. Hand review of difficulty and cross-check links, starting with the themes used in early levels.

## Answers from Simon (latest)

- Theme families (merging into the parent): later levels only, occasionally, needs at least 4 sub-themes.
- "Combine themes" setting: drop it.
- Half-word style: try envelope plus basket on the ground first.
- Zipf numbers stay in the game file for now.
- Localisation: much later.

## Open questions for Simon

- **Tries per level.** Today every level allows 5 wrong drops (`GameModel.MaxTries`), whether it has 2 themes or 15.
  The proposal is to let the allowance grow with the level size, for example `3 + themes / 2` rounded down
  (2 themes: 4 tries, 6 themes: 6, 10 themes: 8, 16 themes: 11), and to use the tries dial to tighten it on hard
  levels. Also: how many spare tries and hints the bank can hold.
