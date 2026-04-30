import { renderProjects } from "./render-projects.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initMagneticButtons } from "./magnetic-button.js";
import { initProjectCarousel } from "./project-carousel.js";

function init() {
  renderProjects();
  initScrollReveal();
  initMagneticButtons();
  initProjectCarousel();
}

init();
