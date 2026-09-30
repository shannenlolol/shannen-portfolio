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
    if (link.pathname === path || (link.pathname === "/experience" && path.startsWith("/experience/"))) {
      link.setAttribute("aria-current", "page");
    }
  });
  return mountTimeControl(host.querySelector<HTMLElement>(".time-control-host")!);
}
