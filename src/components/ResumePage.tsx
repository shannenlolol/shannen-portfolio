export default function ResumePage() {
  return <main id="main-content" className="resume-page">
    <header className="resume-heading">
      <h1 className="eyebrow">Resume</h1>
    </header>
    <div className="resume-actions">
      <a className="button button-primary" href="/assets/Shannen%20Lee%20Resume.pdf" target="_blank" rel="noreferrer">Open my resume</a>
      <a className="text-link" href="/assets/Shannen%20Lee%20Resume.pdf" download>Download PDF</a>
    </div>
    {/* Phones can't preview a PDF inline (most show nothing, or a page too small to read), so they get an image of
        it instead, which opens the PDF itself. Regenerate it with `npm run resume:preview` when the resume changes. */}
    <a className="resume-image" href="/assets/Shannen%20Lee%20Resume.pdf" target="_blank" rel="noreferrer">
      <img src="/assets/resume-preview.png" alt="Shannen Lee’s resume. Opens the PDF." width="1400" height="1977" loading="lazy" />
    </a>
    <div className="resume-viewer">
      <object className="resume-document" data="/assets/Shannen%20Lee%20Resume.pdf#view=FitH&navpanes=0" type="application/pdf" aria-label="Shannen Lee’s resume">
        <p>Your browser can’t preview this PDF. <a href="/assets/Shannen%20Lee%20Resume.pdf" target="_blank" rel="noreferrer">Open my resume</a> to read it.</p>
      </object>
    </div>
  </main>;
}
