# Wordlist Builder

A browser tool for building Word Safari's theme tree and wordlists. It is static (no build step) and hosted at https://freefallmode.github.io/wordlist-builder/ (GitHub Pages, deployed from `main`).

To run it locally, serve the folder rather than opening the file directly, otherwise the frequency list cannot load: `python3 -m http.server`, then open http://localhost:8000.

## Files

- `index.html`, `style.css`, `app.js`: the app.
- `data/freq-en.txt`: English word frequencies (Zipf scale), built by `tools/build_freq.py` from [wordfreq](https://github.com/rspeer/wordfreq).
- `data/themes.txt`: the theme tree (outline format, see HANDOFF.md). Load it from Import / export → Add starter theme tree. Built from `data/gen/tree-*.txt` (one file per top-level group) by `tools/merge_tree.py`, which also checks it.
- `data/wordlist.json`: the full starter wordlist (project format): every theme with its words and word data. Open it from Import / export → Open starter wordlist. Built by `tools/build_wordlist.py` from the generated batches in `data/gen/words/batch-*.json` (one per group of about 45 themes; `tools/check_words.py` checks a batch). Themes the generator flagged are listed in `data/gen/words/flags.txt`.
- `HANDOFF.md`: design decisions, data model and file formats.

## Data credits

`data/freq-en.txt` is derived from wordfreq by Robyn Speer, whose data is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It includes data from Google Books Ngrams, Wikipedia, OpenSubtitles, SUBTLEX and other sources listed in the wordfreq README.
