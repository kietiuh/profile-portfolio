import { renderProjects } from "./render-projects.js";
import { renderHomeHighlights } from "./render-home.js";
import { renderWorkCases } from "./render-work.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initMagneticButtons } from "./magnetic-button.js";
import { initProjectCarousel } from "./project-carousel.js";
import { initProjectDetail } from "./project-detail.js";
import { initTheme } from "./theme.js";
import { initPageInteractions } from "./page-interactions.js";
import { initHeroCanvas } from "./hero-canvas.js";
import { initCopyEmail, initScrollProgress, initSpotlight } from "./page-effects.js";
import { initSmoothScroll, refreshSmoothScroll } from "./smooth-scroll.js";

let booted = false;

export function initPage() {
  if (!booted) {
    initTheme();
    initSmoothScroll();
    booted = true;
  }

  document.body.classList.remove("detail-open");
  renderHomeHighlights();
  renderProjects();
  renderWorkCases();
  initScrollReveal();
  initMagneticButtons();
  initProjectCarousel();
  initProjectDetail();
  initScrollProgress();
  initSpotlight();
  initCopyEmail();
  initPageInteractions();
  initHeroCanvas();
  refreshSmoothScroll();
  document.dispatchEvent(new CustomEvent("portfolio:page-ready"));
}
