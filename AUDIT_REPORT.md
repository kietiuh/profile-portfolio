# Architectural Health Check — Profile Portfolio

## Scope
Deep audit of `src/scripts/`, `src/styles/`, `src/data/`, and the data-driven UI flow across `index.html`, `work.html`, and `process.html`.

## Data Flow Map

```txt
src/data/projects.js
  ├─ render-home.js        → hero product pills + home story cards
  ├─ render-projects.js    → home phone showcase
  ├─ render-work.js        → work.html case cards
  ├─ project-detail.js     → project detail drawer data lookup
  └─ project-carousel.js   → reads rendered `.phone-card` metadata for accent/focus state

main.js
  └─ app-init.js
      ├─ global once: theme + smooth scroll
      └─ per-route: renderers + interactions + effects
```

## Critical Issues / Bugs / Bottlenecks

1. **Route lifecycle can re-bind listeners repeatedly**
   - `initPage()` runs after PJAX route swaps.
   - Some modules attach listeners directly each call (`page-interactions`, `project-detail`, `magnetic-button`, `scroll-reveal`, `page-effects`).
   - Risk: duplicate handlers, memory leaks, repeated work after route changes.

2. **Smooth-scroll implementation is high-risk**
   - It prevents native wheel scrolling and transforms `<main>`.
   - This can break browser expectations, accessibility, and layout calculations.
   - It is disabled on mobile, but still potentially problematic on desktop.

3. **Rendering assumes complete data shape**
   - Renderers directly access fields such as `storyTitle`, `keyDecision`, `stack`, `widget`.
   - Missing keys would produce broken UI or `undefined` content.

4. **CSS token drift**
   - Many hard-coded colors, radii, shadows, transitions, and spacing values live in section files.
   - This makes global theming and future redesign harder.

5. **Large section files remain**
   - `projects.css` and `pages.css` are still the largest style files.
   - They are maintainable, but not yet “production immaculate.”

6. **Manual quality gates exist but are not automated**
   - Repeated ad-hoc checks are good but not encoded in a reusable project script.

## Architectural Weaknesses

1. **No shared DOM utility layer**
   - Common helpers such as selector lookup, escaping, listener cleanup, and required-field checks are duplicated or missing.

2. **No project schema validation**
   - `projects.js` is central but unguarded.

3. **No route cleanup model**
   - Modules do not have a consistent cleanup contract.

4. **CSS lacks centralized motion tokens**
   - Timing/easing values appear across files.

5. **Work/Home renderers repeat HTML-string patterns**
   - Acceptable for a small site, but should use shared safety helpers and validated data.

## Proposed Refactoring Steps

### CSS
- Add centralized design/motion/spacing tokens to `base.css`.
- Replace repeated hard-coded values with tokens where low-risk.
- Add section container/query-friendly tokens for future scaling.
- Remove outdated comments/rules if found.

### JS/Data
- Add `src/scripts/utils/dom.js` for small DOM helpers and HTML escaping.
- Add `src/scripts/utils/project-schema.js` to validate/sanitize project data.
- Update renderers and detail drawer to consume validated projects.
- Add idempotency guards/event delegation where modules can re-run after PJAX.
- Reduce repeated event attachment risk.

### Quality
- Add `tools/lint-check.js` for project-specific static checks:
  - required files
  - JS syntax via `node --check`
  - CSS brace balance
  - HTML local refs
  - project schema validation
  - disallowed dead markers
- Update README and ROADMAP with architecture/scaling guidance.

## Success Criteria
- No duplicate route-bound event listeners after PJAX navigation.
- Project data validation fails fast and clearly during checks.
- Renderers degrade gracefully if optional fields are absent.
- CSS tokens centralize common values.
- `node tools/lint-check.js` passes.
