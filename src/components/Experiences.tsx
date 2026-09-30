import { experiences } from "../data/experiences";
export default function Experiences() {
  return (
    <section className="section" id="experience">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">01 / Where I’ve contributed</p>
          <h2>
            Different challenges.
            <br />
            One builder’s mindset.
          </h2>
        </div>
        <a className="text-link" href="/experience">
          View all experience
        </a>
      </div>
      <div className="experience-list">
        {experiences.map((job, index) => (
          <a
            className="experience-row"
            key={job.slug}
            href={`/experience/${job.slug}`}
          >
            <span className="experience-number">0{index + 1}</span>
            <div className={`company-logo company-logo-${job.slug}`}>
              <img
                src={job.logo}
                alt=""
                width="110"
                height="54"
                loading="lazy"
              />
            </div>
            <div className="experience-main">
              <p className="eyebrow">{job.field}</p>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>
            <div className="experience-meta">
              <span>{job.period}</span>
              <span className="experience-cta">View experience</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
