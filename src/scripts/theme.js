const storageKey = "portfolio-theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme, button) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);
  if (button) {
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

export function initTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  applyTheme(getPreferredTheme(), button);
  button?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark", button);
  });
}
