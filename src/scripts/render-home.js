import { projects } from "../data/projects.js";

export function renderHomeHighlights() {
  const pills = document.querySelector("[data-product-pills]");
  if (pills) {
    pills.innerHTML = projects.map((project) => `<li>${project.name}</li>`).join("");
  }

  const storyGrid = document.querySelector("[data-story-grid]");
  if (storyGrid) {
    storyGrid.innerHTML = projects.map((project) => `
      <article class="story-card story-card--${project.storyTone}" data-reveal>
        <p class="eyebrow">${project.name}</p>
        <h3>${project.storyTitle}</h3>
        <p>${project.storySummary}</p>
      </article>
    `).join("");
  }
}
