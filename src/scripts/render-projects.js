import { projects } from "../data/projects.js";

function renderWidget(type) {
  if (type === "chart") {
    return `
      <div class="screen-widget widget-chart" aria-hidden="true">
        <div class="balance-card"><span>Balance</span><strong>$12,840</strong></div>
        <div class="bars"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="transaction-row"><span></span><b></b></div>
      </div>`;
  }

  if (type === "people") {
    return `
      <div class="screen-widget widget-people" aria-hidden="true">
        <div class="avatar-row"><span></span><span></span><span></span></div>
        <div class="memory-card"></div>
        <div class="timeline-card"><i></i><i></i><i></i></div>
      </div>`;
  }

  return `
    <div class="screen-widget widget-calendar" aria-hidden="true">
      <div class="day-card"><strong>07</strong><span>Focus</span></div>
      <div class="habit-rings"><i></i><i></i></div>
      <div class="note-card"></div>
      <div class="mini-grid"><span></span><span></span><span></span></div>
    </div>`;
}

function projectTemplate(project) {
  const stack = project.stack.map((item) => `<li>${item}</li>`).join("");

  return `
    <article class="phone-card phone-card--${project.id}" data-project-id="${project.id}" data-accent="${project.accent}" data-cursor-label="View" data-reveal>
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
