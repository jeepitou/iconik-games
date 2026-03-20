# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Monarchs of Sylleria**, a card game by Iconik Games. Deployed at `www.iconikgames.ca` via GitHub Pages. No build step — pure HTML/CSS/JS.

## Development

No package.json or build tools. Serve locally with:

```bash
python -m http.server 8000
# or
npx http-server
```

Then open `http://localhost:8000`.

## Utility Scripts (Node.js)

These are one-off content management tools, not part of the site:

- `node extract-i18n.js` — Splits `locales/translations.json` into `locales/en.json` and `locales/fr.json`
- `node download-guild-icons.js` — Downloads guild icon images
- `node download-missing-images.js` — Downloads missing game images

## Architecture

### Single-page layout (`index.html`)

Five scrollable sections: Project, Guilds, Gameplay, Team, Footer. Navigation is fixed at 80px height with smooth-scroll anchors.

### i18n System (`js/i18n.js`)

All translatable text elements use `class="t"`. The `I18n` class:
- Detects browser language or reads from `localStorage`
- Stores original English text in `data-original-text` attributes
- Swaps text on language toggle (EN ↔ FR)
- Fires a `languageChanged` custom event after each swap

Translations live in `js/i18n.js` as an embedded `TRANSLATIONS` object (English key → French value). The files in `locales/` are generated references, not loaded at runtime.

### Animations (`js/main.js`)

Uses `IntersectionObserver` to trigger `.visible` class on `.feature-card`, `.guild-card`, `.gameplay-card`, and `.team-member` elements as they scroll into view. CSS handles the actual fade-in transitions.

### CSS Design Tokens (`css/style.css`)

```css
--color-primary: #FF6B35       /* Brand orange */
--color-secondary: #2D3142     /* Dark blue-gray */
--color-accent: #FFA447
--font-primary: 'Inter'
--font-display: 'Playfair Display'
--container-max-width: 1200px
--navbar-height: 80px
```

## Adding/Editing Translations

1. Add or update the English→French pair in the `TRANSLATIONS` object inside `js/i18n.js`
2. Mark the HTML element with `class="t"` — the text content becomes the lookup key
3. Run `node extract-i18n.js` to keep `locales/en.json` and `locales/fr.json` in sync (optional, for reference)
