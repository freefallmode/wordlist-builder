# Wordlist Builder

A browser tool for building Word Safari's theme tree and wordlists. It is static (no build step) and hosted at https://freefallmode.github.io/wordlist-builder/ (GitHub Pages, deployed from `main`).

To run it locally, serve the folder rather than opening the file directly, otherwise the frequency list cannot load: `python3 -m http.server`, then open http://localhost:8000.

## Files

- `index.html`, `style.css`, `app.js`: the app.
- `data/freq-en.txt`: English word frequencies (Zipf scale), built by `tools/build_freq.py` from [wordfreq](https://github.com/rspeer/wordfreq).
- `themes-starter.txt`: starter theme outline. Load it from Import / export → Load starter outline.
- `HANDOFF.md`: design decisions, data model and file formats.

## Data credits

`data/freq-en.txt` is derived from wordfreq by Robyn Speer, whose data is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It includes data from Google Books Ngrams, Wikipedia, OpenSubtitles, SUBTLEX and other sources listed in the wordfreq README.
