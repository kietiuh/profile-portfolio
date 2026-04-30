export function initScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

export function initSpotlight() {
  const targets = [...document.querySelectorAll(".glass-card, .story-card, .process-step, .metric-card")];
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return;

  targets.forEach((target) => {
    target.classList.add("has-spotlight");
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
}

export function initCopyEmail() {
  const button = document.querySelector("[data-copy-email]");
  const toast = document.querySelector("[data-toast]");
  if (!button || !toast) return;

  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
      toast.textContent = "Email copied";
    } catch {
      toast.textContent = email;
    }

    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  });
}
