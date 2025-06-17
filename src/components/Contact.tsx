// src/components/Contact.tsx
;

const Contact = () => {
  return (
    <section id="contact" className="section-connector">
      <div className="container section-padding">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center" data-aos="fade-up" data-aos-delay="100">
              <br />
              <h1>Contact </h1>
              <div className="line"></div>
              <br />
              <p>Let's Connect!</p>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-sm" style={{ textAlign: 'center', marginTop: '20px' }}>
            <a className="btn btn-light btn-sm" role="button" aria-pressed="true" href="https://www.linkedin.com/in/shannen-lee-4b7301216/" style={{ width: '40%' }}>
              <img src="/assets/images/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="col-sm" style={{ textAlign: 'center', marginTop: '20px' }}>
            <a className="btn btn-light btn-sm" role="button" aria-pressed="true" href="https://github.com/shannenlolol" style={{ width: '40%' }}>
              <img src="/assets/images/github.png" alt="GitHub" />
            </a>
          </div>
          <div className="col-sm" style={{ textAlign: 'center', marginTop: '20px' }}>
            <a className="btn btn-light btn-sm" role="button" aria-pressed="true" href="https://t.me/shannenlolol" style={{ width: '40%' }}>
              <img src="/assets/images/telegram.png" alt="Telegram" />
            </a>
          </div>
        </div>

        <div className="row" style={{ marginTop: '50px' }}>
          <div className="col-md-6 offset-md-3" data-aos="fade-up" data-aos-delay="100">
            <div className="emailme border-hover shadow rounded-5 bg-secondary" style={{ height: '80%', width: '100%' }}>
              <div className="section-title text-center" data-aos="fade-up">
                <form action="mailto:shannenlee21@yahoo.com" method="post" encType="text/plain">
                  <label style={{ marginTop: '60px' }}>Your Name:</label>
                  <br />
                  <input type="text" name="yourName" style={{ borderRadius: '12px' }} />
                  <br /><br />

                  <label>Your Message: </label>
                  <br />
                  <textarea name="yourMessage" rows={10} cols={40} style={{ width: '80%', borderRadius: '12px' }}></textarea>
                  <br />

                  <input type="submit" style={{ height: '10%', width: '30%', borderRadius: '12px', marginTop: '40px' }} />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
