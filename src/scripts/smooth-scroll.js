let current = 0;
let target = 0;
let raf = 0;
let enabled = false;
const ease = 0.12;

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function syncBodyHeight() {
  const main = document.querySelector("main");
  const height = main ? main.getBoundingClientRect().height + main.offsetTop : document.documentElement.scrollHeight;
  document.body.style.minHeight = `${Math.max(window.innerHeight, height)}px`;
}

function tick() {
  current += (target - current) * ease;
  if (Math.abs(target - current) < 0.08) current = target;
  document.documentElement.style.setProperty("--smooth-scroll-y", `${current}px`);
  window.dispatchEvent(new CustomEvent("portfolio:smooth-scroll", { detail: { y: current, progress: maxScroll() ? current / maxScroll() : 0 } }));
  if (current !== target) raf = requestAnimationFrame(tick);
  else raf = 0;
}

function requestTick() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function onWheel(event) {
  if (!enabled) return;
  event.preventDefault();
  target = Math.max(0, Math.min(maxScroll(), target + event.deltaY));
  requestTick();
}

function onKey(event) {
  if (!enabled) return;
  const keys = { PageDown: window.innerHeight * 0.86, PageUp: -window.innerHeight * 0.86, Home: -Infinity, End: Infinity, ArrowDown: 80, ArrowUp: -80, Space: window.innerHeight * 0.86 };
  if (!(event.key in keys)) return;
  event.preventDefault();
  const delta = keys[event.key];
  target = delta === Infinity ? maxScroll() : delta === -Infinity ? 0 : Math.max(0, Math.min(maxScroll(), target + delta));
  requestTick();
}

export function smoothScrollTo(y, immediate = false) {
  target = Math.max(0, Math.min(maxScroll(), y));
  if (immediate) current = target;
  requestTick();
}

export function refreshSmoothScroll() {
  if (!enabled) return;
  syncBodyHeight();
  target = Math.min(target, maxScroll());
  current = Math.min(current, maxScroll());
  document.documentElement.style.setProperty("--smooth-scroll-y", `${current}px`);
}

export function initSmoothScroll() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const narrow = window.matchMedia("(max-width: 820px)").matches;
  enabled = fine && !narrow && !reduced;
  document.documentElement.classList.toggle("smooth-scroll-enabled", enabled);
  if (!enabled) return;

  current = window.scrollY;
  target = current;
  syncBodyHeight();
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKey);
  window.addEventListener("resize", refreshSmoothScroll);
  document.addEventListener("portfolio:page-ready", () => requestAnimationFrame(refreshSmoothScroll));
}
