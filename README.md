# Ultimate Snake - Legendary Edition

A browser game built with HTML, CSS, and vanilla JavaScript.

## Overview

Ultimate Snake is an arcade-style Snake game with:

- 5 themed worlds with bosses
- 10 levels per world
- Enemy types with different behaviors
- Shop system (skins, consumables, permanent upgrades)
- Achievement system and player stats
- Mobile D-pad controls in addition to keyboard controls

The project is now split by concern:
- `index.html` for markup/UI structure
- `styles/game.css` for styling
- `js/game.js` for game logic

## Quick Start

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Run a local server (recommended)

From this project directory:

```bash
python3 -m http.server 8000
```

Then open:

- <http://localhost:8000>

## Controls

- Move: `Arrow Keys` or `WASD`
- Pause/Resume: `Space`
- On mobile: use the on-screen D-pad

## Gameplay Notes

- Eat food to score and grow.
- Build combos for higher rewards.
- Collect special items for bonuses and power-ups.
- Defeat enemies and world bosses to progress.
- Spend coins in the shop to improve long-term performance.

## Project Structure

- `index.html`: UI markup and screen layout
- `styles/game.css`: all game styles
- `js/game.js`: gameplay logic, rendering, and input handling

## Requirements

- Any modern desktop or mobile browser
- No build step, package manager, or external dependencies
