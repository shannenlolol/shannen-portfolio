export default function Education() {
  return (
    <main id="main-content" className="education-page">
      <header className="education-page-heading">
        <p className="eyebrow">Education / Always learning</p>
        <h1>
          A foundation for
          <br />
          <span className="serif-accent">what comes next.</span>
        </h1>
        <p>
          Computer science, a new perspective abroad, and continued learning in
          machine learning.
        </p>
      </header>
      <div className="education-page-grid">
        <div className="education-records">
          <article className="education-record" id="ntu">
            <div className="education-logo">
              <img src="/assets/images/NTU.png" alt="" width="64" height="64" />
            </div>
            <div>
              <p className="eyebrow">Aug 2020 – Dec 2024</p>
              <h2>Nanyang Technological University</h2>
              <h3>Bachelor of Computing in Computer Science</h3>
              <p>Honours with Distinction</p>
              <p className="education-detail">
                Specialisations in Artificial Intelligence and Data Science &
                Analytics.
              </p>
            </div>
          </article>
          <article className="education-record" id="boston">
            <div className="education-logo">
              <img
                src="/assets/images/BU.png"
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow">May 2023 – Jul 2023</p>
              <h2>Boston University</h2>
              <h3>Summer Exchange Programme</h3>
              <p className="education-detail">
                Deep Learning and Design Strategy & Software.
              </p>
            </div>
          </article>
          <article className="education-record" id="aws">
            <div className="education-logo education-logo-aws">
              <img
                src="/assets/images/aws.png"
                alt="AWS certification badge"
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow">Certification · May 2025</p>
              <h2>AWS Certified Machine Learning Engineer – Associate</h2>
              <h3>Amazon Web Services</h3>
              <p className="education-detail">
                Building, training, tuning, and deploying machine learning
                models using AWS services.
              </p>
              <a
                className="text-link"
                href="https://www.credly.com/badges/0fb77826-915f-4f24-91f7-ad6289124323/public_url"
                target="_blank"
                rel="noreferrer"
              >
                View credential
              </a>
            </div>
          </article>
        </div>
        <div className="education-gallery">
          <figure>
            <a
              href="/assets/images/ntu_friends.jpeg"
              aria-label="View full NTU friends photo"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/images/ntu_friends.jpeg" alt="" />
            </a>
            <figcaption>The people along the way · NTU</figcaption>
          </figure>
          <figure className="education-certificate">
            <a
              href="/assets/images/MDP.png"
              aria-label="View full MDP certificate"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/images/MDP.png" alt="" loading="lazy" />
            </a>
          </figure>
        </div>
      </div>
    </main>
  );
}
