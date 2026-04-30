import { getProjectById } from "./utils/project-schema.js";
import { escapeHtml } from "./utils/dom.js";

let lastActiveElement = null;
let escapeListenerBound = false;

function detailTemplate(project) {
  const stack = project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  return `
    <div class="detail-backdrop" data-detail-close></div>
    <aside class="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" tabindex="-1">
      <button class="detail-close" type="button" aria-label="Đóng chi tiết dự án" data-detail-close>×</button>
      <p class="eyebrow">Project Detail</p>
      <h2 id="detail-title">${escapeHtml(project.name)}</h2>
      <p class="detail-tagline">${escapeHtml(project.tagline)}</p>
      <div class="detail-stack">${stack}</div>
      <dl class="detail-list">
        <div><dt>Role</dt><dd>${escapeHtml(project.role)}</dd></div>
        <div><dt>Challenge</dt><dd>${escapeHtml(project.challenge)}</dd></div>
        <div><dt>Result</dt><dd>${escapeHtml(project.result)}</dd></div>
      </dl>
    </aside>
  `;
}

function closeDetail(container) {
  container.classList.remove("is-open");
  container.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
  lastActiveElement?.focus?.();
}

function openDetail(container, project) {
  lastActiveElement = document.activeElement;
  container.innerHTML = detailTemplate(project);
  container.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
  requestAnimationFrame(() => {
    container.classList.add("is-open");
    container.querySelector(".detail-panel")?.focus();
  });
}

export function initProjectDetail() {
  const rail = document.querySelector("[data-project-rail]");
  const container = document.querySelector("[data-project-detail]");
  if (!rail || !container || rail.dataset.detailBound) return;
  rail.dataset.detailBound = "true";

  rail.addEventListener("click", (event) => {
    const card = event.target.closest(".phone-card");
    if (!card) return;
    const project = getProjectById(card.dataset.projectId);
    if (project) openDetail(container, project);
  });

  container.addEventListener("click", (event) => {
    if (event.target.closest("[data-detail-close]")) closeDetail(container);
  });

  if (!escapeListenerBound) {
    document.addEventListener("keydown", (event) => {
      const activeContainer = document.querySelector("[data-project-detail].is-open");
      if (event.key === "Escape" && activeContainer) closeDetail(activeContainer);
    });
    escapeListenerBound = true;
  }
}
