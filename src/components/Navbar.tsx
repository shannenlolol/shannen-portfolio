import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="/" className="wordmark" aria-label="Shannen Lee home">
        shannen lee
      </a>
      <div className="header-controls">
        <ThemeToggle />
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </div>
      <nav
        id="main-nav"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        <a
          href="/experience"
          aria-current={
            /^\/experience(?:\/|$)/.test(window.location.pathname)
              ? "page"
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Experience
        </a>
        <a
          href="/projects"
          aria-current={
            window.location.pathname.replace(/\/$/, "") === "/projects"
              ? "page"
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Projects
        </a>
        <a
          href="/skills"
          aria-current={
            window.location.pathname.replace(/\/$/, "") === "/skills"
              ? "page"
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Skills
        </a>
        <a
          href="/education"
          aria-current={
            window.location.pathname.replace(/\/$/, "") === "/education"
              ? "page"
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Education
        </a>
        <a
          href="/contact"
          aria-current={
            window.location.pathname.replace(/\/$/, "") === "/contact"
              ? "page"
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Contact
        </a>
        <a
          className="nav-resume"
          href="/assets/Shannen%20Lee%20Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
