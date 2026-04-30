import { renderProjects } from "./render-projects.js";
import { renderWorkCases } from "./render-work.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initMagneticButtons } from "./magnetic-button.js";
import { initProjectCarousel } from "./project-carousel.js";
import { initProjectDetail } from "./project-detail.js";
import { initTheme } from "./theme.js";
import { initPageInteractions } from "./page-interactions.js";
import { initCopyEmail, initScrollProgress, initSpotlight } from "./page-effects.js";

function init() {
  initTheme();
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
}

init();
