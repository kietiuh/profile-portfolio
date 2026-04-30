# Roadmap & Technical Debt

## Completed

- [x] Multi-page vanilla architecture: Home, Work, Process.
- [x] Data-driven project rendering from `src/data/projects.js`.
- [x] Seamless PJAX-style route transitions with View Transitions progressive enhancement.
- [x] Desktop-only smooth scroll with reduced-motion/mobile guards.
- [x] Interactive hero canvas atmosphere.
- [x] Advanced reveal/parallax/scrub effects.
- [x] Native cursor restored for better UX.
- [x] Work Lab masonry-style filtering and expandable case notes.
- [x] CSS token centralization for core colors, glass, motion, spacing, and focus primitives.
- [x] Project schema checker and renderer hardening with escaped HTML output.
- [x] Route re-init idempotency for major interaction modules.
- [x] Project-specific automated lint script in `tools/lint-check.js`.

## Future Technical Debt

- [ ] Add browser-level visual regression checks with Playwright before large visual changes.
- [ ] Replace custom smooth scroll with native CSS where acceptable, or with a battle-tested engine if production analytics justify it.
- [ ] Split `projects.css` into smaller BEM-oriented files if the showcase grows beyond the current scope.
- [ ] Add real production assets and replace placeholder contact/domain values.
- [ ] Add Lighthouse CI once deployed.
- [ ] Add unit tests for schema validation and route lifecycle if the site evolves into a larger product.

## Scaling Rules

1. Add project content only in `src/data/projects.js`.
2. Add rendering behavior in `src/scripts/render-*.js`, not inline HTML.
3. Add reusable helpers under `src/scripts/utils/`.
4. Prefer event delegation for dynamic sections.
5. Use tokens from `src/styles/base.css` before introducing new raw colors/timings.
