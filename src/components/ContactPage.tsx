import SocialLinks from "./SocialLinks";

export default function ContactPage() {
  const submitted =
    new URLSearchParams(window.location.search).get("sent") === "1";

  return (
    <main id="main-content" className="contact-page">
      <div className="contact-page-intro">
        <h1 className="eyebrow">Contact / Say hello</h1>
        <p>
          Have an interesting idea, a question, or an opportunity? Leave me a
          message here.
        </p>
        <div className="contact-address">
          <span className="eyebrow">Or find me here</span>
          <SocialLinks />
        </div>
      </div>
      {submitted ? (
        <section
          className="contact-form-panel contact-thanks"
          aria-labelledby="thanks-title"
        >
          <p className="eyebrow">Thank you</p>
          <h2 id="thanks-title">Thanks for reaching out.</h2>
          <p>
            Your form has been submitted. I look forward to reading your
            message.
          </p>
          <a className="button button-primary" href="/contact">
            Write another message
          </a>
        </section>
      ) : (
        <section className="contact-form-panel" aria-labelledby="form-title">
          <h2 id="form-title">Send me a message</h2>
          <form
            action="https://formsubmit.co/shannenlee0211@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="New message from Shannen’s portfolio"
            />
            <input
              type="hidden"
              name="_next"
              value={`${window.location.origin}/contact?sent=1`}
            />
            <input type="hidden" name="_template" value="table" />
            <div className="contact-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
              <p className="field-hint">So I can get back to you.</p>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                maxLength={10000}
                required
              />
            </div>
            <p className="form-note">
              All fields are required. You may be asked to complete a spam check
              when sending.
            </p>
            <button className="button button-primary" type="submit">
              Send message
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
