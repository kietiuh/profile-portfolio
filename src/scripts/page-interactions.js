const checklistStorageKey = "portfolio-readiness-checklist";

export function initCaseFilters() {
  const group = document.querySelector("[data-filter-group]");
  const cards = [...document.querySelectorAll(".case-card")];
  const count = document.querySelector("[data-filter-count]");
  if (!group || !cards.length) return;

  function applyFilter(filter) {
    let visibleCount = 0;
    cards.forEach((card) => {
      card.hidden = false;
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-filtered-out", !visible);
      card.setAttribute("aria-hidden", String(!visible));
      if (visible) visibleCount += 1;
    });
    if (count) count.textContent = `Showing ${visibleCount} case ${visibleCount === 1 ? "study" : "studies"}`;
    window.setTimeout(() => {
      cards.forEach((card) => { card.hidden = card.classList.contains("is-filtered-out"); });
    }, 260);
  }

  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    group.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    applyFilter(button.dataset.filter);
  });

  applyFilter("all");
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

  function activate(tab, shouldFocus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute("aria-controls"); });
    if (shouldFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      activate(tabs[nextIndex], true);
    });
  });
}

export function initReadinessChecklist() {
  const checks = [...document.querySelectorAll("[data-check-item]")];
  const count = document.querySelector("[data-check-count]");
  const progress = document.querySelector("[data-check-progress]");
  const reset = document.querySelector("[data-reset-checklist]");
  if (!checks.length || !count) return;

  const saved = JSON.parse(localStorage.getItem(checklistStorageKey) || "[]");
  checks.forEach((item, index) => { item.checked = Boolean(saved[index]); });

  const update = () => {
    const checked = checks.filter((item) => item.checked).length;
    count.textContent = String(checked);
    if (progress) progress.style.transform = `scaleX(${checked / checks.length})`;
    localStorage.setItem(checklistStorageKey, JSON.stringify(checks.map((item) => item.checked)));
  };

  checks.forEach((item) => item.addEventListener("change", update));
  reset?.addEventListener("click", () => {
    checks.forEach((item) => { item.checked = false; });
    update();
  });
  update();
}

export function initPageInteractions() {
  initCaseFilters();
  initCaseToggles();
  initTabs();
  initReadinessChecklist();
}
