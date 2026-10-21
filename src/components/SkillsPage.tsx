import { useRef } from "react";
import type { CSSProperties } from "react";
import { skillGroups } from "../data/skills";
import type { Skill } from "../data/skills";
import useReveal from "../hooks/useReveal";
import "../cottage/skills.css";

// Light brand colours (e.g. JavaScript yellow) need a dark glyph to stay legible on their tile.
function inkFor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6 ? "#1d1d1b" : "#ffffff";
}

function SkillIcon({ skill }: { skill: Skill }) {
  const hex = skill.icon?.hex ?? skill.colour?.replace("#", "") ?? "526344";
  const style = { "--tile": `#${hex}`, "--glyph": inkFor(hex) } as CSSProperties;
  return (
    <span className="skill-icon" style={style} aria-hidden="true">
      {skill.icon ? (
        <svg viewBox="0 0 24 24" focusable="false"><path d={skill.icon.path} /></svg>
      ) : (
        <span className="skill-monogram">{skill.monogram}</span>
      )}
    </span>
  );
}

export default function SkillsPage() {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".skill-group");

  return (
    <main id="main-content" className="skills-page" ref={page}>
      <header className="skills-heading">
        <div>
          <h1 className="eyebrow">Skills</h1>
        </div>
        {/* <p>The languages, frameworks and tools I’ve used across my roles and projects.</p> */}
      </header>

      <div className="skill-groups">
        {skillGroups.map((group) => {
          // Spaces would split aria-labelledby into several ids, so use a slug.
          const id = `skills-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
          return (
            <section className="skill-group" key={group.title} aria-labelledby={id}>
              <h2 id={id}>{group.title}</h2>
              <ul>
                {group.skills.map((skill, i) => (
                  <li className="skill-chip" key={skill.name} style={{ "--i": i } as CSSProperties}>
                    <SkillIcon skill={skill} />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
