const palette = ["rgba(141,179,155,.42)", "rgba(71,89,255,.32)", "rgba(216,121,164,.34)", "rgba(255,255,255,.38)"];

export function initHeroCanvas() {
  const canvas = document.querySelector("[data-hero-canvas]");
  const root = document.querySelector("[data-hero-canvas-root]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || !root || reduced) return;

  const ctx = canvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const orbs = Array.from({ length: 18 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    r: 80 + Math.random() * 190,
    vx: (Math.random() - 0.5) * 0.0008,
    vy: (Math.random() - 0.5) * 0.0008,
    color: palette[index % palette.length]
  }));
  let width = 0;
  let height = 0;
  let raf = 0;

  function resize() {
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawOrb(orb) {
    const influenceX = (pointer.x - 0.5) * 46;
    const influenceY = (pointer.y - 0.5) * 32;
    const x = orb.x * width + influenceX;
    const y = orb.y * height + influenceY;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
    gradient.addColorStop(0, orb.color);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, orb.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function tick() {
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    orbs.forEach((orb) => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1;
      if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1;
      drawOrb(orb);
    });
    raf = requestAnimationFrame(tick);
  }

  root.addEventListener("pointermove", (event) => {
    const rect = root.getBoundingClientRect();
    pointer.tx = (event.clientX - rect.left) / rect.width;
    pointer.ty = (event.clientY - rect.top) / rect.height;
  });

  resize();
  window.addEventListener("resize", resize);
  cancelAnimationFrame(raf);
  tick();
}
