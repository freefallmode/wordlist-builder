# Wordlist Builder: Project Handoff

## Purpose
A client-side web app for generating themed wordlists for a word game. The output is a data file consumed by an **offline games pack**. Themes are hierarchical (e.g. food > desserts, nature > forest / water types), possibly with sub-sub-themes.

## Requirements stated by the user
- Client-side only is fine for now (no backend).
- Sources to pull from: **Wikidata, WordNet, ConceptNet, and an LLM**.
- **Filters must be optional toggles**, not always-on.
- **Every word has an enabled/disabled toggle.** All words for a theme are stored, but not all are necessarily "in play".
- The output must be a data file usable offline.
- The user is an experienced developer (Flutter, Kotlin, React/TypeScript), so code-level detail is fine.

## Design decisions
1. **Tags plus hierarchy, not strict nesting.** Words carry a list of theme tags, and themes form a parent/child tree. Querying a theme means "all words tagged with it or any descendant", so sub-sub-themes come free and a word (e.g. tomato) can sit in several themes without duplication.
2. **One entry per normalized word.** The word ID is a slug of the lowercased text, with diacritics stripped. Re-pulling a word from another source or theme adds a tag and a source badge instead of a duplicate.
3. **Filters never delete.** Filters run at import time (and via "re-apply"). Failing words are stored as `enabled: false` with a note giving the reason. Available filters: length range, letters only (spaces and hyphens allowed), block multi-word, blocklist (user-supplied list, empty by default). The "re-apply" button overrides manual toggles, so it asks for confirmation.
4. **Difficulty (1 to 5)** is currently a length-based guess and is editable per word. Real frequency scoring is planned but not built.
5. **Stable theme IDs** are slugs of the theme name at creation and do not change on rename. This matters for the offline data file.
6. **Localization-ready intent.** Concept IDs are intended to stay stable so per-language words can be added later. This is not implemented yet.
7. **Deployment:** delivered as a single self-contained `index.html` (hosted on GitHub Pages), vanilla JS with no build step. It must be opened locally or hosted on a static site. It cannot run as a hosted claude.ai artifact, because that environment blocks requests to Wikidata, ConceptNet and the Anthropic API.

## Sources implemented
| Source | How it works |
|---|---|
| Wikidata | Accepts a QID or class name. A name is resolved via `wbsearchentities` (top hit, description shown). Then SPARQL `?i wdt:P31/wdt:P279* wd:<QID>` with English labels, `LIMIT 1000`. Very broad classes may time out. |
| ConceptNet | `api.conceptnet.io/query?end=/c/en/<term>&rel=/r/IsA&limit=500`, keeping English start nodes. |
| LLM | Direct browser call to the Anthropic Messages API (`anthropic-dangerous-direct-browser-access` header). The user pastes a key, which is not persisted. The prompt includes the theme path and asks for a JSON array. The model string is editable and defaults to `claude-sonnet-5-5`. |
| Manual | Paste words separated by newlines or commas. |

**WordNet is not implemented.** It has no hosted API, so it needs a preprocessed JSON subset (hypernym/hyponym trees) bundled into the app.

## Data model (in-memory and localStorage key `wlb`)
```js
S = {
  themes: { [id]: { id, name, parent, wd, cn } },   // wd/cn = saved Wikidata QID / ConceptNet term
  words:  { [id]: { id, t, tags: [themeId], on: bool, d: 1..5, src: [source], note } },
  sel: themeId | null,
  f: { /* saved filter control values */ }
}
```

## Export format
JSON (re-importable, which also serves as a load-project feature):
```json
{
  "schema": 1,
  "generated": "ISO timestamp",
  "themes": [{ "id": "desserts", "name": "desserts", "parent": "food" }],
  "words": [{ "id": "tiramisu", "text": "tiramisu", "tags": ["desserts"], "enabled": true, "difficulty": 3, "sources": ["llm"] }]
}
```
CSV export has the same fields, with `tags` and `sources` pipe-separated. Both have an "enabled words only" option.

## UI features
- Theme tree: add child, rename, delete (cascades to sub-themes; words left with no theme are removed). Shows enabled/total counts per theme, including descendants.
- Word table for the selected theme: search, "include sub-themes" toggle, per-word enable checkbox, difficulty select, source and theme badges, notes, delete. Bulk "enable shown" and "disable shown". The table displays at most 400 rows.

## Known gaps and next steps
- WordNet source (bundled JSON subset).
- Real frequency-based difficulty (e.g. a bundled wordfreq-style list) replacing the length heuristic.
- Move or retag a word between themes in the UI (currently only enable/disable, difficulty, delete).
- A default profanity blocklist (currently empty; the user supplies their own).
- Spelling-variant handling (color/colour, doughnut/donut) and plural normalization.
- Multi-language support via concept IDs.
- Untested: the file has not been run against the live APIs. Expect possible issues with ConceptNet availability and Wikidata SPARQL timeouts on broad classes.
- Optional: port to React/TypeScript if the user wants to extend it. The user codes in React/TS, but the vanilla single file was chosen for zero-setup delivery.
