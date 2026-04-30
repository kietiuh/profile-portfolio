import { getProjects } from "./utils/project-schema.js";
import { escapeHtml } from "./utils/dom.js";

function caseCardTemplate(project, index) {
  const stack = project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  return `
    <article class="case-card case-card--${escapeHtml(project.storyTone)}" style="--case-index:${index}" data-category="${escapeHtml(project.category)}" data-reveal>
      <span class="case-kicker">${escapeHtml(project.type)}</span>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="case-stack" aria-label="${escapeHtml(project.name)} stack">${stack}</div>
      <button class="case-toggle" type="button" aria-expanded="false">Open case notes</button>
      <div class="case-notes" hidden>
        <dl>
          <div><dt>Role</dt><dd>${escapeHtml(project.role)}</dd></div>
          <div><dt>Challenge</dt><dd>${escapeHtml(project.challenge)}</dd></div>
          <div><dt>Key Decision</dt><dd>${escapeHtml(project.keyDecision)}</dd></div>
          <div><dt>Result</dt><dd>${escapeHtml(project.result)}</dd></div>
        </dl>
      </div>
    </article>
  `;
}

export function renderWorkCases() {
  const grid = document.querySelector("[data-case-grid]");
  if (!grid) return;
  grid.innerHTML = getProjects().map(caseCardTemplate).join("");
}
