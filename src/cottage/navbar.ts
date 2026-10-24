import template from "./navbar.html?raw";
import control from "./timeControl.html?raw";
import { mountTimeControl } from "./timeControl";
import "./navbar.css";

export function getNavbarMarkup(path: string) { return template
  .replace('class="cottage-navbar"', `class="cottage-navbar" data-home="${path === "/"}"`)
  .replace('<div class="time-control-host"></div>', `<div class="time-control-host">${control}</div>`);
}

export function mountNavbar(host: HTMLElement, path: string) {
  host.querySelectorAll<HTMLAnchorElement>(".cottage-nav-links a").forEach(link => {
    if (link.pathname === path || ((link.pathname === "/experiences" || link.pathname === "/projects") && path.startsWith(`${link.pathname}/`))) {
      link.setAttribute("aria-current", "page");
    }
  });
  const navbar = host.querySelector<HTMLElement>(".cottage-navbar")!;
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const unmountControl = mountTimeControl(host.querySelector<HTMLElement>(".time-control-host")!);

  // On phones the links fold into a panel under the bar (see navbar.css). The menu button opens it; choosing a link,
  // tapping elsewhere or pressing Escape closes it.
  const menu = host.querySelector<HTMLButtonElement>(".cottage-menu")!;
  const setOpen = (open: boolean) => {
    navbar.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
  };
  const onMenu = () => setOpen(!navbar.classList.contains("is-open"));
  const onLink = (event: Event) => {
    if ((event.target as Element).closest(".cottage-nav-links a")) setOpen(false);
  };
  const onOutside = (event: Event) => {
    if (!navbar.contains(event.target as Node)) setOpen(false);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape" && navbar.classList.contains("is-open")) {
      setOpen(false);
      menu.focus();
    }
  };
  menu.addEventListener("click", onMenu);
  navbar.addEventListener("click", onLink);
  document.addEventListener("click", onOutside);
  document.addEventListener("keydown", onKey);

  return () => {
    window.removeEventListener("scroll", onScroll);
    menu.removeEventListener("click", onMenu);
    navbar.removeEventListener("click", onLink);
    document.removeEventListener("click", onOutside);
    document.removeEventListener("keydown", onKey);
    unmountControl();
  };
}
