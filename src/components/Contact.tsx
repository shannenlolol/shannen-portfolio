// src/components/Contact.tsx
const Contact = () => {
  return (
    <section id='contact' className='section-connector'>
      <div className='container section-padding'>
        <div className='row'>
          <div className='col-12'>
            <div
              className='section-title text-center'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <br />
              <h1>Contact </h1>
              <div className='line'></div>
              <br />
              <p>Let's Connect!</p>
            </div>
          </div>
        </div>

        {/* Social Buttons Row */}
        <div
          className='row justify-content-center g-2 g-sm-3 mb-4'
          data-aos='fade-up'
          data-aos-delay='100'
        >
          <div className='col-4 col-sm-3 col-md-2 text-center'>
            <a
              className='btn btn-light btn-sm w-100 p-2'
              href='https://www.linkedin.com/in/shannen-lee-4b7301216/'
            >
              <img
                src='/assets/images/linkedin.png'
                alt='LinkedIn'
                className='img-fluid'
              />
            </a>
          </div>
          <div className='col-4 col-sm-3 col-md-2 text-center'>
            <a
              className='btn btn-light btn-sm w-100 p-2'
              href='https://github.com/shannenlolol'
            >
              <img
                src='/assets/images/github.png'
                alt='GitHub'
                className='img-fluid'
              />
            </a>
          </div>
          <div className='col-4 col-sm-3 col-md-2 text-center'>
            <a
              className='btn btn-light btn-sm w-100 p-2'
              href='https://t.me/shannenlolol'
            >
              <img
                src='/assets/images/telegram.png'
                alt='Telegram'
                className='img-fluid'
              />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className='row mt-5'>
          <div
            className='col-md-6 offset-md-3'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='emailme border-hover shadow rounded-5 bg-light text-dark p-5'>
              <h4 className='text-center fw-bold text-dark mb-4'>
                Send Me a Message!
              </h4>
              <form
                action='https://formsubmit.co/shannenlee21@yahoo.com'
                method='POST'
              >
                <div className='mb-3'>
                  <label className='form-label'>Your Name:</label>
                  <input
                    type='text'
                    name='yourName'
                    className='form-control'
                    placeholder='e.g. Shannen'
                    style={{ borderRadius: "12px" }}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "e.g. Shannen")}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Email / Contact:</label>
                  <input
                    type='text'
                    name='contactInfo'
                    className='form-control'
                    placeholder='e.g. your@email.com / +65 9123 4567'
                    style={{ borderRadius: "12px" }}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder =
                        "e.g. your@email.com / +65 9123 4567")
                    }
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label className='form-label'>Your Message:</label>
                  <textarea
                    name='yourMessage'
                    className='form-control'
                    style={{
                      height: "180px",
                      borderRadius: "12px",
                      resize: "vertical",
                      color: "#000",
                      caretColor: "#000",
                    }}
                    required
                  ></textarea>
                </div>

                <div className='text-center'>
                  <button
                    type='submit'
                    className='btn btn-primary px-5 py-2 fw-bold'
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
