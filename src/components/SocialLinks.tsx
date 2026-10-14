import { socialIcons } from "../data/socialIcons";

const socialLinks = [
  { id: "email", label: "Email", handle: "shannenlee0211@gmail.com", href: "mailto:shannenlee0211@gmail.com" },
  { id: "linkedin", label: "LinkedIn", handle: "in/shannen-lee", href: "https://www.linkedin.com/in/shannen-lee-4b7301216/" },
  { id: "github", label: "GitHub", handle: "@shannenlolol", href: "https://github.com/shannenlolol" },
] as const;

export default function SocialLinks() {
  return (
    <ul className="social-links">
      {socialLinks.map(link => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.id}>
            <a
              className={`social-link social-${link.id}`}
              href={link.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false"><path d={socialIcons[link.id]} /></svg>
              </span>
              <span className="social-text">
                <strong>{link.label}</strong>
                <span>{link.handle}</span>
              </span>
              {external && <span className="visually-hidden"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
