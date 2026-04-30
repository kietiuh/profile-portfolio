import { initPage } from "./app-init.js";
import { smoothScrollTo } from "./smooth-scroll.js";

const parser = new DOMParser();
const routeSelector = "main";
let isRouting = false;

function isInternalRoute(anchor) {
  if (!anchor || anchor.target || anchor.hasAttribute("download")) return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return /\/$|\.html$/.test(url.pathname) || url.pathname === window.location.pathname;
}

function updateActiveNav() {
  const current = normalizePath(window.location.pathname);
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const path = normalizePath(new URL(link.href, window.location.href).pathname);
    const isCurrent = path === current;
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function normalizePath(pathname) {
  return pathname.endsWith("/") ? "/index.html" : pathname;
}

async function fetchDocument(url) {
  const response = await fetch(url, { headers: { "X-Portfolio-Router": "1" } });
  if (!response.ok) throw new Error(`Route fetch failed: ${response.status}`);
  return parser.parseFromString(await response.text(), "text/html");
}

function replacePage(nextDocument) {
  const currentMain = document.querySelector(routeSelector);
  const nextMain = nextDocument.querySelector(routeSelector);
  if (!currentMain || !nextMain) throw new Error("Missing main route outlet");

  document.title = nextDocument.title;
  currentMain.replaceWith(nextMain);
  updateActiveNav();
  initPage();
}

function scrollForUrl(url) {
  const target = new URL(url, window.location.href);
  if (target.hash) {
    requestAnimationFrame(() => {
      const element = document.querySelector(target.hash);
      if (!element) return;
      smoothScrollTo(element.getBoundingClientRect().top + window.scrollY, true);
    });
    return;
  }
  smoothScrollTo(0, true);
  window.scrollTo(0, 0);
}

async function navigate(url, { history = true } = {}) {
  if (isRouting) return;
  isRouting = true;
  if (new URL(url, window.location.href).href === window.location.href) return;
  document.documentElement.classList.add("is-routing");

  try {
    const nextDocument = await fetchDocument(url);
    const swap = () => replacePage(nextDocument);

    if (document.startViewTransition) await document.startViewTransition(swap).finished;
    else swap();

    if (history) window.history.pushState({ pjax: true, scrollY: 0 }, "", url);
    scrollForUrl(url);
  } catch (error) {
    console.warn(error);
    window.location.href = url;
  } finally {
    document.documentElement.classList.remove("is-routing");
    isRouting = false;
  }
}

export function initRouter() {
  updateActiveNav();

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[href]");
    if (!isInternalRoute(anchor)) return;

    const url = new URL(anchor.href, window.location.href);
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();
    navigate(url.href);
  });

  window.addEventListener("popstate", () => navigate(window.location.href, { history: false }));
}
