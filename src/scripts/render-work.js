import { projects } from "../data/projects.js";

function caseCardTemplate(project, index) {
  const stack = project.stack.map((item) => `<span>${item}</span>`).join("");
  return `
    <article class="case-card case-card--${project.storyTone}" style="--case-index:${index}" data-category="${project.category}" data-cursor-label="Read" data-reveal>
      <span class="case-kicker">${project.type}</span>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="case-stack" aria-label="${project.name} stack">${stack}</div>
      <button class="case-toggle" type="button" aria-expanded="false">Open case notes</button>
      <div class="case-notes" hidden>
        <dl>
          <div><dt>Role</dt><dd>${project.role}</dd></div>
          <div><dt>Challenge</dt><dd>${project.challenge}</dd></div>
          <div><dt>Key Decision</dt><dd>${project.keyDecision}</dd></div>
          <div><dt>Result</dt><dd>${project.result}</dd></div>
        </dl>
      </div>
    </article>
  `;
}

export function renderWorkCases() {
  const grid = document.querySelector("[data-case-grid]");
  if (!grid) return;
  grid.innerHTML = projects.map(caseCardTemplate).join("");
}
