import { useRef } from "react";
import type { CSSProperties } from "react";
import { projects } from "../data/projects";
import useReveal from "../hooks/useReveal";
import EditorPreview from "./EditorPreview";
import { Links, Status, Technologies } from "./ProjectBits";
import { socialIcons } from "../data/socialIcons";
import "../cottage/projects.css";

export default function Projects() {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".project-reveal");
  const featured = projects.filter(p => p.status === "live");
  const inProgress = projects.filter(p => p.status === "polishing");
  const earlier = projects.filter(p => p.status === "earlier");
  return (
    <main className="projects-page" id="main-content" ref={page}>
      <header className="projects-heading">
        <div>
          <h1 className="eyebrow">Projects</h1>
        </div>
        <a className="text-link" href="https://github.com/shannenlolol" target="_blank" rel="noreferrer">
          <svg className="projects-github" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={socialIcons.github} /></svg>
          More on GitHub
        </a>
      </header>

      {featured.map(project => (
        <article className="project-featured project-reveal" id={project.slug} key={project.slug} aria-labelledby={`${project.slug}-title`}>
          {project.slug === "image-editor" ? <EditorPreview /> :
            project.image ? <figure className="project-preview"><img src={`/assets/images/${project.image}`} alt={`${project.name} screenshot`} loading="lazy" /></figure>
            : <div className="project-preview project-placeholder">{project.placeholder ?? "Screenshot to come"}</div>}
          <div className="project-featured-copy">
            <Status project={project} />
            <h2 id={`${project.slug}-title`}>{project.name}</h2>
            <p className="project-description">{project.description}</p>
            <Technologies project={project} />
            <Links project={project} />
            <a className="project-story-link" href={`/projects/${project.slug}`}>Read the story →</a>
          </div>
        </article>
      ))}

      <div className="project-grid">
        {inProgress.map((project, i) => (
          <article className="project-card project-reveal" id={project.slug} key={project.slug} style={{ "--i": i } as CSSProperties} aria-labelledby={`${project.slug}-title`}>
            {project.image
              ? <img className="project-card-image" src={`/assets/images/${project.image}`} alt={`${project.name} screenshot`} loading="lazy" />
              : <div className="project-card-image project-placeholder">{project.placeholder}</div>}
            <div className="project-card-copy">
              <Status project={project} />
              <h2 id={`${project.slug}-title`}>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <Technologies project={project} />
              <Links project={project} />
              <a className="project-story-link" href={`/projects/${project.slug}`}>Read the story →</a>
            </div>
          </article>
        ))}
      </div>

      {earlier.length > 0 && (
        <section className="project-earlier project-reveal" aria-labelledby="earlier-title">
          <h2 className="eyebrow" id="earlier-title">Earlier work</h2>
          <ul>
            {earlier.map(project => (
              <li key={project.slug} id={project.slug}>
                <div>
                  <h3><a href={`/projects/${project.slug}`}>{project.name}</a></h3>
                  <p>{project.description}</p>
                </div>
                <p className="project-earlier-links">
                  {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label}: ${project.name}`}>{link.label} →</a>)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
