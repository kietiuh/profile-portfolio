# Profile Portfolio

A private Apple-inspired interactive portfolio concept for mobile product work. The site is built with plain HTML, modular CSS, and lightweight JavaScript modules — no framework or package dependencies required.

## Features

- Apple-esque minimal visual direction with whitespace, soft glass, and subtle gradients.
- Product-launch style hero with reveal motion, floating product chips, and magnetic CTAs.
- Data-driven app showcase rendered from `src/data/projects.js`.
- Phone-style project mockups with realistic in-screen UI details.
- Horizontal scroll snap carousel with center-focus and project accent glow.
- Interactive project detail drawer with Escape/close support.
- Multi-page expansion with `work.html` and `process.html`.
- Work Lab interactions: project filters, live result count, expandable case notes.
- Process Playbook interactions: accessible tabs, persistent readiness checklist, progress meter.
- Storytelling sections: case studies, process, and design principles/metrics.
- Persistent light/dark theme toggle.
- Scroll progress bar, cursor spotlight, copy-email toast.
- SEO basics: metadata, favicon, robots, sitemap placeholder.
- Reduced-motion support for animation-sensitive users.

## File Structure

```txt
index.html
work.html
process.html
favicon.svg
robots.txt
sitemap.xml
ROADMAP.md
src/
  data/
    projects.js
  scripts/
    main.js
    magnetic-button.js
    page-effects.js
    page-interactions.js
    project-carousel.js
    project-detail.js
    render-projects.js
    scroll-reveal.js
    theme.js
  styles/
    main.css
    base.css
    layout.css
    components.css
    animations.css
    sections/
      contact.css
      hero.css
      pages.css
      project-detail.css
      projects.css
      skills.css
      story.css
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

## Quality Gate Used

Before commits, the project was checked with:

- local static server load via `curl`
- static resource existence checks
- JavaScript syntax checks with `node --check`
- git status review before push

No dependency-based tooling was installed because extra tooling requires explicit approval.
