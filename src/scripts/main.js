import { renderProjects } from "./render-projects.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initMagneticButtons } from "./magnetic-button.js";

function init() {
  renderProjects();
  initScrollReveal();
  initMagneticButtons();
}

init();
