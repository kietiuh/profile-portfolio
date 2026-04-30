export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function oncePerElement(element, key) {
  if (!element) return false;
  const flag = `bound${key[0].toUpperCase()}${key.slice(1)}`;
  if (element.dataset[flag]) return false;
  element.dataset[flag] = "true";
  return true;
}
