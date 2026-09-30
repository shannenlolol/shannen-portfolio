import { projects } from "../data/projects";

export default function HomePreviews() {
  return (
    <>
      <section className="section home-projects" id="projects">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow">02 / Outside the day job</p>
            <h2>Ideas, made real.</h2>
          </div>
          <a className="text-link" href="/projects">
            View all projects
          </a>
        </div>
        <div className="home-project-grid">
          {projects.map((project, index) => (
            <a
              className="home-project-card"
              href={`/projects#project-${index + 1}`}
              key={project.name}
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
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="section home-skills" id="skills">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow">03 / My toolkit</p>
            <h2>From idea to deployment.</h2>
          </div>
          <a className="text-link" href="/skills">
            Explore all skills
          </a>
        </div>
        <a
          href="/skills"
          className="skills-preview"
          aria-label="Explore the full skills terminal"
        >
          <div className="terminal-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="terminal-command">
            <span aria-hidden="true">~</span> skills --highlights
          </p>
          <dl className="terminal-output">
            <div className="terminal-row">
              <dt>build</dt>
              <dd>Python · React · FastAPI · SQL</dd>
            </div>
            <div className="terminal-row">
              <dt>learn</dt>
              <dd>PyTorch · TensorFlow · ROS2</dd>
            </div>
            <div className="terminal-row terminal-aws">
              <dt>ship</dt>
              <dd>Docker · Kubernetes · OpenShift · AWS</dd>
            </div>
          </dl>
          <span className="skills-preview-action">Open full toolkit</span>
        </a>
      </section>
      <section className="section home-education" id="education">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow">04 / Always learning</p>
            <h2>A foundation to build on.</h2>
          </div>
          <a className="text-link" href="/education">
            Education & certifications
          </a>
        </div>
        <div className="education-preview-grid">
          <a className="education-preview" href="/education#ntu">
            <div className="education-logo">
              <img
                src="/assets/images/NTU.png"
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <p className="eyebrow">2020–2024</p>
            <h3>Nanyang Technological University</h3>
            <p>
              Computer Science
              <br />
              Honours with Distinction
            </p>
          </a>
          <a className="education-preview" href="/education#boston">
            <div className="education-logo">
              <img
                src="/assets/images/BU.png"
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <p className="eyebrow">Summer 2023</p>
            <h3>Boston University</h3>
            <p>Summer Exchange Programme</p>
          </a>
          <a className="education-preview" href="/education#aws">
            <div className="education-logo education-logo-aws">
              <img
                src="/assets/images/aws.png"
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <p className="eyebrow">Certification · 2025</p>
            <h3>AWS Machine Learning Engineer</h3>
            <p>Associate certification</p>
          </a>
        </div>
      </section>
    </>
  );
}
