import template from "./footer.html?raw";
import { socialIcons } from "../data/socialIcons";
import "./footer.css";

// The footer is plain HTML, so icons are injected from the same paths the Contact page uses.
const icon = (name: string) => {
  const path = socialIcons[name as keyof typeof socialIcons];
  return path ? `<svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${path}"/></svg>` : "";
};

export const footerMarkup = template
  .replace("{{year}}", String(new Date().getFullYear()))
  .replace(/\{\{icon:(\w+)\}\}/g, (_, name: string) => icon(name));
