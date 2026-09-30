export default function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <h1>
          <span className="hero-greeting">Hi, I’m Shannen.</span>I turn ideas
          into
          <br />
          <span className="serif-accent">working systems.</span>
        </h1>
        <p className="hero-description">
          I’m a software engineer building full-stack applications,
          <br className="desktop-break" /> with a background in machine learning
          and robotics.
        </p>
        <div className="hero-actions">
          <a className="button hero-experience-button" href="/experience">
            View experience
          </a>
          <a
            className="text-link"
            href="/assets/Shannen%20Lee%20Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        </div>
      </div>
      <figure className="hero-portrait">
        <span className="polaroid-tape" aria-hidden="true" />
        <div className="hero-portrait-image">
          <img
            src="/assets/images/profilepic.jpeg"
            alt="Shannen Lee"
            fetchPriority="high"
          />
        </div>
      </figure>
      <div className="hero-bottom">
        <span>COMPUTER SCIENCE, NTU</span>
        <a href="#experience">Discover more ↓</a>
        <span>BASED IN SINGAPORE</span>
      </div>
    </section>
  );
}
