import { useState } from "react";
import { projects } from "../data/projects";
import "../cottage/projects.css";

function EditorPreview() {
  const [after, setAfter] = useState(true);
  return <figure className="project-preview editor-preview">
    <div className="preview-topline">
      <span>Background removal</span>
      <div className="preview-switch" role="group" aria-label="Image Editor preview">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After</button>
      </div>
    </div>
    <div className="editor-preview-canvas">
      <img src={`/assets/images/image-editor/${after ? "after" : "before"}.png`} alt={after ? "Image Editor with an apple isolated on a transparent background" : "Image Editor with the original apple photo on a green background"} loading="lazy" width="1920" height="960" />
    </div>
    <figcaption>One photo. A whole new background.</figcaption>
  </figure>;
}

export default function Projects() {
  return (
    <main className="projects-page" id="main-content">
      <header className="projects-heading">
        <div>
          <p className="eyebrow">Projects / Outside the day job</p>
          <h1>Ideas, <span className="serif-accent">made real.</span></h1>
          <p className="projects-intro">Small ideas, useful tools. A few things I’ve built to make everyday tasks a little easier.</p>
        </div>
        <a className="text-link" href="https://github.com/shannenlolol" target="_blank" rel="noreferrer">More on GitHub</a>
      </header>
      <div className="project-list">
        {projects.map((project, index) => (
          <article className={`project-story project-story-${project.slug}`} id={`project-${index + 1}`} key={project.slug} aria-labelledby={`${project.slug}-title`}>
            {project.slug === "image-editor" ? <EditorPreview /> :
              <figure className="project-preview">
                <div className="preview-topline"><span>{project.kind}</span><span className="preview-number">0{index + 1}</span></div>
                <div className="project-preview-image"><img src={`/assets/images/${project.image}`} alt={`${project.name} app screens`} loading="lazy" /></div>
              </figure>
            }
            <div className="project-story-copy">
              <p className="eyebrow">{project.kind}</p>
              <h2 id={`${project.slug}-title`}>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-detail">{project.detail}</p>
              {project.technologies.length > 0 && <ul className="project-technologies" aria-label="Built with">{project.technologies.map(item => <li key={item}>{item}</li>)}</ul>}
              <div className="project-links">
                {project.links.map((link, i) => <a key={link.href} className={i === 0 ? "button button-primary" : "text-link"} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label}: ${project.name}`}>{link.label}</a>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
