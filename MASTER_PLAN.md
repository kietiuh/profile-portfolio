# MASTER PLAN — Awwwards-Level Portfolio Upgrade

## Mission
Transform the current vanilla HTML/CSS/JS portfolio into a premium, fluid, highly interactive multi-page experience without rewriting to a framework.

## Current Architecture Snapshot
- Static pages: `index.html`, `work.html`, `process.html`
- Central project data: `src/data/projects.js`
- Modular scripts: renderers, carousel, detail drawer, theme, scroll reveal, page interactions
- Modular CSS: base/layout/components/animations + section styles
- No dependency/tooling layer currently

## Upgrade Principles
1. Keep the vanilla ecosystem and progressive enhancement.
2. Preserve existing UI/UX content and routes while upgrading motion/interaction.
3. Favor native APIs when they are enough: View Transitions API, IntersectionObserver, History API, Canvas 2D.
4. Keep features modular and atomic for maintainability.
5. Every major feature gets a quality gate and atomic commit.

## Target Interactions

### 1. Seamless Navigation Shell
- Add a lightweight PJAX router for internal `.html` navigation.
- Use View Transitions API when available.
- Replace only document title + `<main>` content + route metadata hooks.
- Preserve browser back/forward behavior with `popstate`.
- Reset scroll to top for new route and close transient UI.

### 2. Smooth Scroll Engine
- Add a vanilla smooth scrolling module using `requestAnimationFrame`.
- Respect `prefers-reduced-motion`.
- Provide scroll-to-anchor support after PJAX route changes.

### 3. Hero Canvas Atmosphere
- Add a high-DPI canvas layer to the hero.
- Render soft interactive particles/orbs that react to pointer movement.
- Keep it subtle, Apple-like, and cheap enough for performance.

### 4. Advanced Reveal + Scroll Effects
- Upgrade reveal system with word-level text splitting for `[data-split]`.
- Add parallax elements with `[data-parallax]`.
- Add scroll progress CSS variables for project showcase scrub-like transforms.

### 5. Custom Cursor System
- Add custom cursor for fine pointer devices.
- Cursor morphs on magnetic buttons, links, phone cards, route cards, and case cards.
- Use `data-cursor-label` for contextual labels like “View”.

### 6. Dynamic Work Page
- Render Work Lab from `projects.js` as a premium masonry-style grid.
- Smooth filter transitions without abrupt layout jumps.
- Cards get richer metadata and cursor labels.

### 7. QA + Polish
- Run local server checks for all routes/assets.
- Run `node --check` on every JS module.
- Verify local refs, CSS brace matching, and duplicate/dead markers.
- Polish z-index, mobile fallbacks, reduced-motion behavior.

## Execution Plan
1. Phase 1: Create this master plan and commit.
2. Phase 2A: Add PJAX router + route lifecycle, commit.
3. Phase 2B: Add smooth scroll engine, commit.
4. Phase 3A: Add hero canvas atmosphere, commit.
5. Phase 3B: Upgrade scroll reveal/split/parallax effects, commit.
6. Phase 3C: Add custom cursor + magnetic hover affordances, commit.
7. Phase 3D: Upgrade Work Lab to premium masonry/filter cards, commit.
8. Phase 4: QA/polish pass, commit.
9. Phase 5: Rewrite README for final architecture, push final.

## Quality Gates Before Every Commit
- Start/verify local static server.
- `curl` all pages/assets touched.
- `node --check src/scripts/*.js src/data/*.js`.
- Static HTML local reference check.
- CSS brace count check.
- `git status --short` reviewed.
