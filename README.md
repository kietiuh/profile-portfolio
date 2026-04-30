# Profile Portfolio — Production-Grade Vanilla Experience

A premium, multi-page portfolio built with vanilla HTML, modular CSS, and ES modules. The codebase is structured to keep content, rendering, interaction logic, and styling separate while still delivering Awwwards-inspired motion and polish.

Repo: <https://github.com/kietiuh/profile-portfolio>

## Routes

```txt
/             Home / product-launch landing page
/work.html    Interactive Work Lab
/process.html Product Process Playbook
```

## Architecture

```txt
src/data/projects.js              # Single content source for projects
src/scripts/main.js               # Boot entrypoint
src/scripts/app-init.js           # Global + per-route lifecycle orchestration
src/scripts/router.js             # PJAX-style navigation + View Transitions
src/scripts/render-*.js           # Data-to-DOM renderers
src/scripts/utils/dom.js          # DOM and escaping helpers
src/scripts/utils/project-schema.js # Runtime project validation
src/styles/base.css               # Design tokens, theme variables, global primitives
src/styles/sections/*.css         # Section-scoped styling
```

### Data Flow

```txt
projects.js
  ├─ render-home.js      → hero pills + story cards
  ├─ render-projects.js  → phone showcase
  ├─ render-work.js      → Work Lab cards
  └─ project-detail.js   → detail drawer lookup
```

`app-init.js` re-runs route-safe modules after PJAX navigation. Renderers use validated project data and escape user-facing strings before injecting HTML.

## Experience Highlights

- PJAX-style route transitions with View Transitions API enhancement.
- Desktop-only smooth scroll with mobile and reduced-motion guards.
- Interactive hero canvas atmosphere.
- Split-word reveals, parallax headings, and showcase scroll effects.
- Balanced, centered project showcase cards.
- Data-driven Work Lab with filtering, live counts, stack tags, and expandable notes.
- Process tabs with keyboard support and persistent checklist progress.
- Light/dark theme persistence, scroll progress, spotlight cards, copy-email toast.
- Native cursor UX restored for accessibility and comfort.

## Scaling the Project

1. **Add projects in one place:** update `src/data/projects.js`.
2. **Respect the schema:** every project needs the fields checked by `src/scripts/utils/project-schema.js` and `tools/lint-check.js`.
3. **Keep rendering modular:** add/adjust renderer modules instead of duplicating HTML across pages.
4. **Use event delegation:** dynamic sections should attach one listener to a stable parent.
5. **Use design tokens:** prefer variables in `src/styles/base.css` for color, spacing, glass, motion, and focus states.
6. **Run quality gates before pushing.**

## Run Locally

```bash
python3 -m http.server 8765
```

Open:

```txt
http://127.0.0.1:8765
http://127.0.0.1:8765/work.html
http://127.0.0.1:8765/process.html
```

## Quality Gates

```bash
node tools/lint-check.js
```

Manual smoke checks used during development:

```bash
curl -fsS http://127.0.0.1:8765/
curl -fsS http://127.0.0.1:8765/work.html
curl -fsS http://127.0.0.1:8765/process.html
```

## Notes

- No npm install is required.
- Placeholder values remain until real production contact/domain details are provided:
  - `hello@example.dev`
  - `https://example.dev`
- Motion features are progressively enhanced and include reduced-motion fallbacks where appropriate.
