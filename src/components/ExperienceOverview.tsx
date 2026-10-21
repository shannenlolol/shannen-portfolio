import { useRef } from "react";
import type { CSSProperties } from "react";
import { experiences } from "../data/experiences";
import useReveal from "../hooks/useReveal";
import "../cottage/experience.css";

// "Sep 2025 - Present" reads better on a card as "Since Sep 2025".
const shortPeriod = (period: string) =>
  period.endsWith("Present") ? `Since ${period.split(" - ")[0]}` : period.replace(" - ", " – ");

export default function ExperienceOverview() {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".xp-card");
  return (
    <main className="experience-overview" id="main-content" ref={page}>
      <header className="xp-heading">
        <div>
          <h1 className="eyebrow">Experiences</h1>
        </div>
        <ul className="xp-facts" aria-label="At a glance">
          {/* <li>{experiences.length} roles</li>
          <li>Web · ML · Robotics · Platforms</li> */}
        </ul>
      </header>
      <div className="xp-grid">
        {experiences.map((job, index) => {
          const photo = job.images[0];
          return (
            <a
              className="xp-card"
              data-color={job.color}
              href={`/experiences/${job.slug}`}
              key={job.slug}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="xp-photo">
                {/* Roles without photos keep the plain colour block, so the cards stay the same height. */}
                {photo && <img src={`/assets/images/${photo.src}`} alt="" loading="lazy" />}
                <span className="xp-logo">
                  <img src={job.logo} alt="" loading="lazy" />
                </span>
              </div>
              <div className="xp-body">
                <p className="xp-meta">
                  <span>{shortPeriod(job.period)}</span>
                  <span>{job.field}</span>
                </p>
                <h2>
                  {job.company}
                  <span>{job.role}</span>
                </h2>
                <span className="xp-cta" aria-hidden="true">Read more →</span>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
