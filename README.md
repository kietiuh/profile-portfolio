# Profile Portfolio — Awwwards-Level Vanilla Experience

A multi-page, highly interactive portfolio concept built with vanilla HTML, modular CSS, and ES modules. The project intentionally avoids a framework rewrite while adding premium motion, seamless navigation, data-driven rendering, and rich interaction patterns.

## Live Routes

```txt
/             Home / product-launch landing page
/work.html    Interactive Work Lab
/process.html Product Process Playbook
```

## Experience Highlights

- Seamless PJAX-style navigation with native View Transitions API progressive enhancement.
- Vanilla smooth scrolling engine for desktop/fine-pointer devices.
- Interactive hero canvas atmosphere reacting to pointer movement.
- Word-level title reveals, scroll reveal, parallax headings, and showcase scrub variables.
- Data-driven home highlights, app showcase, project drawer, and Work Lab cards from `src/data/projects.js`.
- Premium phone mockup carousel with center focus, accent glow, and project detail drawer.
- Work Lab masonry-style cards with smooth filtering, live counts, expandable notes, and stack tags.
- Process Playbook with accessible keyboard tabs and persistent readiness checklist.
- Light/dark theme persistence, copy-email toast, scroll progress, spotlight cards, and reduced-motion fallbacks.

## Architecture

```txt
index.html
work.html
process.html
MASTER_PLAN.md
README.md
favicon.svg
robots.txt
sitemap.xml

src/
  data/
    projects.js

  scripts/
    main.js              # entrypoint
    app-init.js          # route lifecycle orchestration
    router.js            # PJAX + View Transitions
    smooth-scroll.js     # vanilla smooth scroll engine
    hero-canvas.js       # interactive canvas atmosphere
    render-home.js       # home data-driven sections
    render-projects.js   # phone showcase renderer
    render-work.js       # Work Lab renderer
    project-carousel.js  # carousel center-focus/accent state
    project-detail.js    # project detail drawer
    page-interactions.js # filters, accordions, tabs, checklist
    page-effects.js      # progress, spotlight, copy toast
    magnetic-button.js
    scroll-reveal.js
    theme.js

  styles/
    main.css
    base.css
    layout.css
    components.css
    animations.css
    sections/
      hero.css
      projects.css
      project-detail.css
      skills.css
      contact.css
      story.css
      pages.css
```

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

## Quality Gates Used

Before feature commits, the project was checked with:

```bash
curl -fsS http://127.0.0.1:8765/
curl -fsS http://127.0.0.1:8765/work.html
curl -fsS http://127.0.0.1:8765/process.html
node --check src/scripts/*.js
node --check src/data/*.js
```

Additional scripted checks verify:

- local HTML `href/src` references exist
- CSS brace counts match
- routes and static assets load
- no old corrective/dead markers remain

## Notes

- No npm dependencies are required.
- `hello@example.dev` and `https://example.dev` are placeholders until a real email/domain is provided.
- Motion-heavy features are progressively enhanced and respect `prefers-reduced-motion` where appropriate.
