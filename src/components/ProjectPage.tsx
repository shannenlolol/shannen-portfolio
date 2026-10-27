import { useRef } from "react";
// import type { CSSProperties } from "react"; (for the hidden highlights below)
import { projects } from "../data/projects";
import useReveal from "../hooks/useReveal";
import TrailerPreview from "./TrailerPreview";
import { displaySrc } from "../displayImage";
// Hidden until there are real highlights and screenshots (see below).
// import Polaroid from "./Polaroid";
// import type { Photo } from "./Polaroid";
import { Links, Status, Technologies } from "./ProjectBits";
import "../cottage/projects.css";

// const galleryPlaceholders: Photo[] = [
//   { placeholder: "Screenshot to come", caption: "[caption]", deco: "tape", tilt: -2, width: 260 },
//   { placeholder: "Screenshot to come", caption: "[caption]", deco: "pin", tilt: 2, width: 260 },
// ];

export default function ProjectPage({ slug }: { slug: string }) {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".project-reveal");
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project)
    return (
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>Let’s get you back.</h1>
        <a className="button button-primary" href="/projects">
          All projects
        </a>
      </main>
    );
  const next = projects[(index + 1) % projects.length];
  // const highlights = project.highlights ?? [];

  return (
    <main id="main-content" className="project-page" ref={page}>
      <a className="back-link" href="/projects">
        ← All projects
      </a>

      <header className="pp-hero">
        <Status project={project} />
        <h1>{project.name}</h1>
        <p className="pp-lead">{project.description}</p>
        <Links project={project} />
      </header>

      <div className="pp-preview project-reveal">
        {project.trailer ? (
          <TrailerPreview project={project} />
        ) : project.image ? (
          <a href={`/assets/images/${project.image}`} target="_blank" rel="noreferrer" data-lightbox>
            <img src={displaySrc(`/assets/images/${project.image}`)} alt={`${project.name} screenshot`} />
          </a>
        ) : (
          <div className="project-placeholder">{project.placeholder ?? "Screenshot to come"}</div>
        )}
      </div>

      <div className="pp-body">
        <aside className="pp-aside project-reveal">
          {project.technologies.length > 0 && (
            <section>
              <h2 className="pp-label">Built with</h2>
              <Technologies project={project} />
            </section>
          )}
          {project.runsOn && (
            <section>
              <h2 className="pp-label">Runs on</h2>
              <p>{project.runsOn}</p>
            </section>
          )}
          <section>
            <h2 className="pp-label">Status</h2>
            <p>{project.status === "live" ? "Live and in use" : project.status === "polishing" ? "Being polished" : project.status === "done" ? "Done and in use" : "Earlier project"}</p>
          </section>
        </aside>

        <div className="pp-main">
          {project.why && (
            <section className="pp-note project-reveal">
              <span className="deco deco-clip" aria-hidden="true" />
              <h2 className="pp-label">Why I built it</h2>
              <p>{project.why}</p>
            </section>
          )}
          {project.detail && (
            <section className="pp-section project-reveal">
              <h2 className="pp-label">What it does</h2>
              <p>{project.detail}</p>
            </section>
          )}
          {/* Hidden until each project has real highlights and screenshots: the "What I’m proud of" list and a
              gallery of screenshots.
          {highlights.length > 0 && (
            <section className="pp-section project-reveal">
              <h2 className="pp-label">What I’m proud of</h2>
              <ol className="pp-highlights">
                {highlights.map((item, i) => (
                  <li key={item} style={{ "--i": i } as CSSProperties}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <div className="pp-gallery project-reveal">
            {galleryPlaceholders.map((photo, i) => (
              <Polaroid photo={photo} key={i} />
            ))}
          </div>
          */}
        </div>
      </div>

      <a className="pp-next" href={`/projects/${next.slug}`}>
        <span>
          <span className="pp-label">Next project</span>
          <span className="pp-next-name">{next.name}</span>
        </span>
        <span className="pp-next-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </main>
  );
}
