const accentMap = {
  sage: "rgba(141, 179, 155, 0.2)",
  blue: "rgba(71, 89, 255, 0.16)",
  rose: "rgba(216, 121, 164, 0.18)"
};

export function initProjectCarousel() {
  const rail = document.querySelector("[data-project-rail]");
  const projectsSection = document.querySelector("#projects");
  if (!rail || !projectsSection || !("IntersectionObserver" in window)) return;

  const cards = [...rail.querySelectorAll(".phone-card")];
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      cards.forEach((card) => card.classList.toggle("is-centered", card === visible.target));
      const accent = visible.target.dataset.accent;
      projectsSection.style.setProperty("--active-project-glow", accentMap[accent] || "rgba(255,255,255,0)");
    },
    { root: rail, threshold: [0.42, 0.58, 0.72, 0.86] }
  );

  cards.forEach((card) => observer.observe(card));
  cards[0]?.classList.add("is-centered");
}
