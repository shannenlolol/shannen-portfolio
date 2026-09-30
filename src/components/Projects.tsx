import { projects } from "../data/projects";

export default function Projects() {
  return (
    <main className="projects-page" id="main-content">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">Projects / Outside the day job</p>
          <h1>
            Ideas, <span className="serif-accent">made real.</span>
          </h1>
        </div>
        <a
          className="text-link"
          href="https://github.com/shannenlolol"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub
        </a>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <a
            className="project-card"
            id={`project-${index + 1}`}
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className={`project-image project-image-${index}`}>
              <img
                src={`/assets/images/${project.image}`}
                alt={`${project.name} preview`}
                loading="lazy"
              />
            </div>
            <div className="project-caption">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="project-action">{project.action}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
