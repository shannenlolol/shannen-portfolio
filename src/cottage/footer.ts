import template from "./footer.html?raw";
import "./footer.css";

export const footerMarkup = template.replace("{{year}}", String(new Date().getFullYear()));
