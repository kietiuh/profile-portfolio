import { projects } from "../data/projects.js";

function renderWidget(type) {
  if (type === "chart") {
    return `<div class="screen-widget widget-chart" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`;
  }

  if (type === "people") {
    return `<div class="screen-widget widget-people" aria-hidden="true"><span></span><span></span><span></span></div>`;
  }

  return `<div class="screen-widget widget-calendar" aria-hidden="true"><span></span><span></span><span></span><span></span></div>`;
}

function projectTemplate(project) {
  const stack = project.stack.map((item) => `<li>${item}</li>`).join("");

  return `
    <article class="phone-card phone-card--${project.id}" data-project-id="${project.id}" data-accent="${project.accent}">
      <button class="phone-button" type="button" aria-label="Xem chi tiết ${project.name}">
        <span class="phone-frame">
          <span class="phone-screen">
            <span class="status-pill">${project.name}</span>
            <span class="phone-content">
              <span class="phone-title">${project.tagline}</span>
              <span class="phone-description">${project.description}</span>
            </span>
            ${renderWidget(project.widget)}
          </span>
        </span>
      </button>
      <ul class="phone-stack" aria-label="Công nghệ của ${project.name}">${stack}</ul>
    </article>
  `;
}

export function renderProjects() {
  const rail = document.querySelector("[data-project-rail]");
  if (!rail) return;
  rail.innerHTML = projects.map(projectTemplate).join("");
}
