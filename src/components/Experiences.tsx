const Experiences = () => {
  return (
    <section id='experience' className='section-padding section-connector'>
      <div className='container'>
        <div className='row'>
          <div className='col-12' data-aos='fade-up' data-aos-delay='100'>
            <div className='section-title text-center'>
              <br />
              <h1>Experiences</h1>
              <div className='line'></div>
            </div>
          </div>
        </div>

        <div className='row gy-5 gx-lg-5 mt-lg-5 flex-column flex-lg-row'>
          {/* Right Column: Carousel + LinkedIn */}
          <div className='col-lg-5 d-flex flex-column gap-5'>
            {/* Carousel */}
            <div data-aos='fade-up' data-aos-delay='100'>
              <div
                id='imageCarousel2'
                className='carousel slide'
                data-bs-ride='carousel'
              >
                <div className='carousel-inner rounded shadow'>
                  <div className='carousel-item active'>
                    <img
                      src='/assets/images/conti_group.jpeg'
                      className='d-block w-100 object-fit-cover'
                      alt='Conti group'
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                  <div className='carousel-item'>
                    <img
                      src='/assets/images/Conti_solo.jpeg'
                      className='d-block w-100 object-fit-cover'
                      alt='Conti solo'
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                  <div className='carousel-item'>
                    <img
                      src='/assets/images/DSO-prawning.jpg'
                      className='d-block w-100 object-fit-cover'
                      alt='DSO prawning'
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                </div>
                <button
                  className='carousel-control-prev'
                  type='button'
                  data-bs-target='#imageCarousel2'
                  data-bs-slide='prev'
                >
                  <span
                    className='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button
                  className='carousel-control-next'
                  type='button'
                  data-bs-target='#imageCarousel2'
                  data-bs-slide='next'
                >
                  <span
                    className='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <div
              data-aos='fade-up'
              data-aos-delay='200'
              className='order-3 order-lg-2'
            >
              <div className='service border-hover shadow rounded-5 bg-dark p-4'>
                <iframe
                  src='https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7275813594418528256'
                  width='100%'
                  height='600'
                  frameBorder='0'
                  allowFullScreen
                  title='LinkedIn DSO Post'
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Left Column: All Job Experiences */}
          <div className='col-lg-7 d-flex flex-column gap-5'>
            {/* DSO */}
            <div data-aos='fade-up' data-aos-delay='100'>
              <div
                className='service border-hover shadow rounded-5 bg-dark'
                style={{ padding: "8%" }}
              >
                <h3>DSO National Laboratories</h3>
                <h5>Machine Learning Engineer Intern</h5>
                <small className='text-brand'>July 2024 – Dec 2024</small>
                <p className='experience mt-3'>
                  <span className='d-block mb-2'>
                    • Developed hierarchical RL system with PyTorch
                  </span>
                  <span className='d-block mb-2'>
                    • Coordinated multiple agents using MARL techniques
                  </span>
                  <span className='d-block mb-2'>
                    • Optimised reward/state/observation settings
                  </span>
                </p>
              </div>
            </div>

            {/* Continental */}
            <div data-aos='fade-up' data-aos-delay='200'>
              <div
                className='service border-hover shadow rounded-5 bg-dark'
                style={{ padding: "8%" }}
              >
                <h3>Continental Automotive Singapore Pte Ltd</h3>
                <h5>Software Engineer Intern</h5>
                <small className='text-brand'>July 2023 – Dec 2023</small>
                <p className='experience mt-3'>
                  <span className='d-block mb-2'>
                    • Built fleet management system using Python, ROS2, and
                    OpenRMF
                  </span>
                  <span className='d-block mb-2'>
                    • Integrated robot fleet for last-mile delivery demo
                  </span>
                  <span className='d-block mb-2'>
                    • Deployed via Docker on AWS EC2 with Ubuntu
                  </span>
                </p>
              </div>
            </div>

            {/* AMARIS.AI */}
            <div data-aos='fade-up' data-aos-delay='300'>
              <div
                className='service border-hover shadow rounded-5 bg-dark'
                style={{ padding: "8%" }}
              >
                <h3>AMARIS.AI Pte Ltd</h3>
                <h5>Software Developer Intern</h5>
                <small className='text-brand'>July 2022 – Dec 2022</small>
                <p className='experience mt-3'>
                  <span className='d-block mb-2'>
                    • Built full-stack AI web app using React (frontend) and
                    FastAPI (backend)
                  </span>
                  <span className='d-block mb-2'>
                    • Wrote SQL queries and managed migrations on MariaDB
                  </span>
                  <span className='d-block mb-2'>
                    • Containerised workflows for deployment with Docker
                  </span>
                </p>
                <a
                  className='btn btn-primary btn-sm mt-3'
                  href='/assets/images/Testimonial Amaris AI.pdf'
                  target='_blank'
                >
                  View Recommendation Letter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
