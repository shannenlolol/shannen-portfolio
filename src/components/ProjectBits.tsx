import type { Project } from "../data/projects";

const statusLabel: Record<Project["status"], string> = { live: "Live", polishing: "Polishing", done: "Done", earlier: "Earlier" };

export function Status({ project }: { project: Project }) {
  return <p className="project-meta">
    <span className={`project-status is-${project.status}`}><span aria-hidden="true" />{statusLabel[project.status]}</span>
    <span>{project.kind}</span>
  </p>;
}

export function Links({ project }: { project: Project }) {
  if (!project.links.length) return null;
  return <div className="project-links">
    {project.links.map((link, i) => <a key={link.href} className={i === 0 ? "button button-primary" : "text-link"} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label}: ${project.name}`}>{link.label}</a>)}
  </div>;
}

export function Technologies({ project }: { project: Project }) {
  if (!project.technologies.length) return null;
  return <ul className="project-technologies" aria-label="Built with">{project.technologies.map(item => <li key={item}>{item}</li>)}</ul>;
}
