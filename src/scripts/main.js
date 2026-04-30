import { renderProjects } from "./render-projects.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initMagneticButtons } from "./magnetic-button.js";
import { initProjectCarousel } from "./project-carousel.js";
import { initProjectDetail } from "./project-detail.js";

function init() {
  renderProjects();
  initScrollReveal();
  initMagneticButtons();
  initProjectCarousel();
  initProjectDetail();
}

init();
