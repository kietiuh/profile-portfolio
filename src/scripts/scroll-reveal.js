const revealSelector = "[data-reveal]";

function splitText() {
  document.querySelectorAll("[data-split]").forEach((element) => {
    if (element.dataset.splitReady) return;
    const parts = element.innerHTML.split(/(<br\s*\/?\s*>)/i);
    element.innerHTML = parts.map((part) => {
      if (/^<br/i.test(part)) return part;
      return part.split(/\s+/).filter(Boolean).map((word) => `<span class="word"><span>${word}</span></span>`).join(" ");
    }).join("");
    element.querySelectorAll(".word > span").forEach((word, index) => word.style.setProperty("--word-index", index));
    element.dataset.splitReady = "true";
  });
}

function initParallax() {
  const items = [...document.querySelectorAll("[data-parallax]")];
  if (!items.length) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const update = () => {
    const viewport = window.innerHeight;
    items.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.08);
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - viewport / 2;
      item.style.setProperty("--parallax-y", `${center * speed * -1}px`);
    });
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("portfolio:smooth-scroll", update);
  window.addEventListener("resize", update);
}

function initShowcaseScrub() {
  const rail = document.querySelector("[data-project-rail]");
  if (!rail) return;
  const update = () => {
    const max = Math.max(1, rail.scrollWidth - rail.clientWidth);
    rail.style.setProperty("--rail-progress", `${rail.scrollLeft / max}`);
  };
  rail.addEventListener("scroll", update, { passive: true });
  update();
}

export function initScrollReveal() {
  splitText();
  initParallax();
  initShowcaseScrub();

  const elements = [...document.querySelectorAll(revealSelector)];
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12%", threshold: 0.18 }
  );

  elements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 55, 280)}ms`);
    observer.observe(element);
  });
}
