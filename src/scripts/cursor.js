export function initCursor() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced || document.querySelector(".cursor")) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.innerHTML = '<span class="cursor-dot"></span><span class="cursor-label"></span>';
  document.body.append(cursor);

  const state = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2 };
  const label = cursor.querySelector(".cursor-label");

  function setMode(target) {
    const interactive = target.closest("a, button, .phone-card, .case-card, .route-card, [data-cursor-label]");
    const text = interactive?.dataset.cursorLabel || (interactive?.classList.contains("phone-card") ? "View" : interactive ? "Open" : "");
    cursor.classList.toggle("is-active", Boolean(interactive));
    cursor.classList.toggle("has-label", Boolean(text));
    label.textContent = text;
  }

  function tick() {
    state.x += (state.tx - state.x) * 0.18;
    state.y += (state.ty - state.y) * 0.18;
    cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
    requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", (event) => {
    state.tx = event.clientX;
    state.ty = event.clientY;
    setMode(event.target);
  });
  window.addEventListener("pointerleave", () => cursor.classList.remove("is-active", "has-label"));
  tick();
}
