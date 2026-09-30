export default function ResumePage() {
  return <main id="main-content" className="resume-page">
    <p className="eyebrow">Resume / The story so far</p>
    <h1>A little more<br />about my work.</h1>
    <p>My experience, education, and technical toolkit, all in one place.</p>
    <a className="button button-primary" href="/assets/Shannen%20Lee%20Resume.pdf" target="_blank" rel="noreferrer">Open my resume ↗</a>
    <a className="text-link" href="/assets/Shannen%20Lee%20Resume.pdf" download>Download PDF</a>
    <object className="resume-document" data="/assets/Shannen%20Lee%20Resume.pdf" type="application/pdf" aria-label="Shannen Lee’s resume">
      <p>Your browser can’t preview this PDF. Use the link above to open or download it.</p>
    </object>
  </main>;
}
