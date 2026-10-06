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
- Import / export holds everything else: project files, exports, the starter outline, the older Wikidata / ConceptNet / Datamuse pulls, maintenance.

## Claude

Called straight from the browser (`anthropic-dangerous-direct-browser-access`). The API key is entered in Settings and kept for the session only, unless "remember" is ticked (then it is in localStorage). Models: Claude Opus 5.5 (default), Sonnet 5.5, Haiku 4.5. Requests use structured outputs (`output_config.format` with a JSON schema) so replies are always valid JSON, effort `medium`, and on Opus/Sonnet `fallbacks: "default"` (beta `server-side-fallback-2026-07-01`) so a classifier decline is retried on another model. Generate sub-themes shows suggestions with example words for picking before anything is added.

## Frequency and difficulty

- Frequency is stored as a Zipf value: log10 of occurrences per billion words. 7 is "the", 5 to 6 everyday words, 4 common, 3 uncommon, 2 rare, under 1.5 not in the list. Looked up in `data/freq-en.txt` (wordfreq "large" English list, single letter-only words down to Zipf 1.5, about 170k words). Phrases combine like wordfreq: 1/f = sum of 1/f_i.
- Difficulty 1 to 5 is "auto" from Zipf (`autoDiff` in `app.js`: 4.8, 4.0, 3.3, 2.6 cut points) unless set by hand. Frequency is not familiarity (kiwi is rarer in text than it is unfamiliar, and homographs like mercury or apple are inflated), so hand overrides matter.
- Theme difficulty defaults to depth in the tree (groups not counted), or is set by hand.

## Data model (in memory)

```js
P = {
  themes: [{ id, name, label, parent, group, kind, region, d, note, wd, cn, dm }],  // display order
  words:  { [slug]: { t, uk, th: [themeId], on, z, d, src: ['L','M','W','C','D'], note } },
}
```
- Theme `id` is a slug of the name at creation and never changes on rename (levels and translations will refer to it).
- `kind`: '' (category), 'place' (things found at a place), 'property' (things sharing a property), 'wordplay'.
- `region`: '' or a continent, for regional stops on the journey.
- `group`: a container for browsing, never a playable theme.
- `label`: the name shown in the game when it differs from `name`.
- Word `t` is the American spelling (capitals kept for proper nouns such as Paris or Plato); `uk` is the British spelling when it differs. The key is a lowercase slug of `t`. The Spelling setting (toolbar toggle) picks which form is shown and written to the game file; search and duplicate checks use both. Import / export → "Find British spellings" asks Claude to fill in `uk` for older words.
- Word `z`: Zipf (the higher of the two spellings), `null` if rarer than the list, `undefined` if not looked up yet. `d`: null means auto.

## File formats

Project file and IndexedDB autosave (`schema: 2`), compact: theme rows are arrays described by `themeFields`; word rows by `wordFields`; words refer to themes by **index** in the themes array. Zipf is stored times ten (0 = rarer than the list, -1 = unknown). Sources are one letter each (L llm, M manual, W wikidata, C conceptnet, D datamuse). Opening a schema 1 file (the first version) converts it; the first version's localStorage data (`wlb`) is migrated on first load.

Game file (Import / export → Game file): minified, enabled words only, `v: 1`, `spelling: "US" | "UK"`. `themes: [id, name, label, parentIndex (-1 = top), group, kind, region, difficulty]`, `words: [text, zipf10, difficulty, [themeIndex…], otherSpelling?]` where `text` is in the chosen spelling.

Theme outline (`themes-starter.txt`, Load starter outline, Export outline): two spaces per level, groups end in `:`, and a kind may follow the name in brackets, e.g. `beach [place]`.

## Word filters

Single words 3 to 12 letters; two-word names (shown on two lines in the game) up to 20 letters in total and 12 per word; more than two words is rejected. Filters only mark words disabled with a reason, never delete.

## Known gaps and next steps

- A word's theme links only come from where it was generated or added. The game rule "no word fits two themes in a level" needs every theme a word truly fits, so a cross-check pass (Claude asked which nearby themes each word also fits) is the next big piece.
- No links between themes beyond parent/child (siblings and easily confused themes are what make levels hard).
- No plural merging, and only US/UK spelling pairs (not other variants such as donut/doughnut in the same dialect).
- No profanity list by default.
- Multi-language: theme ids are stable, words are not yet keyed by concept.
