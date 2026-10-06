# Wordlist Builder

A client-side tool for building the theme tree and wordlists for Word Safari. It is a single HTML file with no build step: open `index.html` in a browser, or use the hosted copy at https://freefallmode.github.io/wordlist-builder/ (GitHub Pages, deployed from `main`).

- `index.html`: the app. Data is kept in the browser's localStorage (key `wlb`); use Export to save it.
- `themes-starter.txt`: starter theme outline. Load it with "Import themes". Lines ending in `:` are groups.
- `HANDOFF.md`: design decisions, data model, export format and known gaps.
