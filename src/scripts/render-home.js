import { getProjects } from "./utils/project-schema.js";
import { escapeHtml } from "./utils/dom.js";

export function renderHomeHighlights() {
  const projects = getProjects();
  const pills = document.querySelector("[data-product-pills]");
  if (pills) {
    pills.innerHTML = projects.map((project) => `<li>${escapeHtml(project.name)}</li>`).join("");
  }

  const storyGrid = document.querySelector("[data-story-grid]");
  if (storyGrid) {
    storyGrid.innerHTML = projects.map((project) => `
      <article class="story-card story-card--${escapeHtml(project.storyTone)}" data-reveal>
        <p class="eyebrow">${escapeHtml(project.name)}</p>
        <h3>${escapeHtml(project.storyTitle)}</h3>
        <p>${escapeHtml(project.storySummary)}</p>
      </article>
    `).join("");
  }
}
