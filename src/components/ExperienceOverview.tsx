import { experiences } from "../data/experiences";

export default function ExperienceOverview() {
  return (
    <main className="experience-overview" id="main-content">
      <header className="experience-overview-heading">
        <p className="eyebrow">Experience / Where I’ve contributed</p>
        <h1>
          Different challenges.
          <br />
          <span className="serif-accent">One builder’s mindset.</span>
        </h1>
        <p>
          From full-stack products to intelligent systems. Explore the projects,
          contributions, and lessons behind each role.
        </p>
      </header>
      <div className="experience-overview-list">
        {experiences.map((job) => (
          <a
            className="experience-overview-card"
            href={`/experience/${job.slug}`}
            key={job.slug}
          >
            <div className={`company-logo company-logo-${job.slug}`}>
              <img
                src={job.logo}
                alt=""
                width="110"
                height="54"
                loading="lazy"
              />
            </div>
            <div className="experience-overview-copy">
              <p className="eyebrow">{job.field}</p>
              <h2>{job.company}</h2>
              <p className="overview-role">{job.role}</p>
              <p className="overview-summary">{job.summary}</p>
              <ul className="overview-tools" aria-label="Key technologies">
                {job.skills.slice(0, 4).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="experience-overview-meta">
              <span>{job.period}</span>
              <span className="experience-cta">Read about this role</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
