import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#282522" : "#fff9e8");
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      /* The toggle also works when storage is unavailable. */
    }
  }

  return (
    <button
      className="theme-switch"
      type="button"
      role="switch"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-checked={dark}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      <span className="theme-switch-thumb" aria-hidden="true" />
      <svg
        className="theme-switch-sun"
        viewBox="0 0 24 24"
        width="23"
        height="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className="theme-switch-moon"
        viewBox="0 0 24 24"
        width="23"
        height="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
      </svg>
    </button>
  );
}
