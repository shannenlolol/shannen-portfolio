import { experiences } from "../data/experiences";
export default function ExperiencePage({ slug }: { slug: string }) {
  const index = experiences.findIndex((job) => job.slug === slug);
  const job = experiences[index];
  if (!job)
    return (
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>Let’s get you back.</h1>
        <a className="button button-primary" href="/">
          Return home
        </a>
      </main>
    );
  const next = experiences[(index + 1) % experiences.length];
  return (
    <main id="main-content" className="experience-page">
      <a className="back-link" href="/experience">
        ← All experience
      </a>
      <div className="detail-hero">
        <div className={`company-logo detail-logo company-logo-${job.slug}`}>
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            width="140"
            height="65"
          />
        </div>
        <p className="eyebrow">{job.field}</p>
        <h1>
          {job.company}
          <span className="serif-accent">{job.role}</span>
        </h1>
        <p className="detail-summary">{job.summary}</p>
        <div className="detail-meta">
          <span>{job.period}</span>
          <span>Singapore</span>
        </div>
      </div>
      <div className={`metrics-panel ${job.color}`}>
        {job.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="detail-body">
        <aside>
          <p className="eyebrow">The toolkit</p>
          <div className="skill-tags">
            {job.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          {job.recommendation && (
            <a
              className="text-link recommendation"
              href={job.recommendation}
              target="_blank"
              rel="noreferrer"
            >
              Read recommendation
            </a>
          )}
        </aside>
        <div>
          <p className="eyebrow">The context</p>
          <p className="large-copy">{job.context}</p>
          <div className="contributions">
            <h2>My contributions</h2>
            {job.contributions.map((item, i) => (
              <article key={item.title}>
                <span className="contribution-number">0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      {job.images.length > 0 && (
        <div className="experience-gallery">
          {job.images.map((img) => (
            <figure key={img.src}>
              <img
                src={`/assets/images/${img.src}`}
                alt={img.alt}
                loading="lazy"
              />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <a className="next-experience" href={`/experience/${next.slug}`}>
        <div>
          <p className="eyebrow">Next experience</p>
          <h2>{next.company}</h2>
        </div>
      </a>
    </main>
  );
}
