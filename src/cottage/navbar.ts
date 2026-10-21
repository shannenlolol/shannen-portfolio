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
    if (link.pathname === path || ((link.pathname === "/experience" || link.pathname === "/projects") && path.startsWith(`${link.pathname}/`))) {
      link.setAttribute("aria-current", "page");
    }
  });
  const navbar = host.querySelector<HTMLElement>(".cottage-navbar")!;
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const unmountControl = mountTimeControl(host.querySelector<HTMLElement>(".time-control-host")!);
  return () => {
    window.removeEventListener("scroll", onScroll);
    unmountControl();
  };
}
