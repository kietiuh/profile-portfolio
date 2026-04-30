export function initCaseFilters() {
  const group = document.querySelector("[data-filter-group]");
  const cards = [...document.querySelectorAll(".case-card")];
  if (!group || !cards.length) return;

  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    group.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
    });
  });
}

export function initCaseToggles() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".case-toggle");
    if (!button) return;
    const notes = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Open case notes" : "Close case notes";
    if (notes) notes.hidden = expanded;
  });
}

export function initTabs() {
  const root = document.querySelector("[data-tabs]");
  if (!root) return;
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];

  function activate(tab) {
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute("aria-controls"); });
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab)));
}

export function initReadinessChecklist() {
  const checks = [...document.querySelectorAll("[data-check-item]")];
  const count = document.querySelector("[data-check-count]");
  if (!checks.length || !count) return;

  const update = () => {
    count.textContent = String(checks.filter((item) => item.checked).length);
  };

  checks.forEach((item) => item.addEventListener("change", update));
  update();
}

export function initPageInteractions() {
  initCaseFilters();
  initCaseToggles();
  initTabs();
  initReadinessChecklist();
}
