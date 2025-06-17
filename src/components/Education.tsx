// src/components/Education.tsx
;

const Education = () => {
  return (
    <section id="education" className="section-padding section-connector">
      <div className="container">
        <div className="row">
          <div className="col-12" data-aos="fade-up" data-aos-delay="100">
            <div className="section-title text-center">
              <br />
              <h1>Education</h1>
              <div className="line"></div>
            </div>
          </div>
        </div>

        <div className="row align-items-stretch">
          {/* ✅ Carousel first on mobile, second on large screens */}
          <div className="col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center">
            <div className="col-12" data-aos="fade-up" data-aos-delay="100">
              <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/assets/images/ntu_friends.jpeg"
                      className="d-block w-100 rounded"
                      alt="NTU friends"
                      style={{ objectFit: 'contain', maxHeight: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/assets/images/MDP.png"
                      className="d-block w-100 rounded"
                      alt="MDP certificate"
                      style={{ objectFit: 'contain', maxHeight: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Captions second on mobile, first on large screens */}
          <div className="col-lg-6 order-2 order-lg-1 mb-4 d-flex flex-column justify-content-center">
            <div className="col-12" data-aos="fade-up" data-aos-delay="100">
              <div className="eduexp p-4">
                <div className="service border-hover shadow rounded-5 bg-dark" style={{ padding: '8%' }}>
                  <h3>Nanyang Technological University</h3>
                  <h5>Bachelor of Engineering (Computer Science)</h5>
                  <small className="text-brand">Aug 2020 – Dec 2024</small>
                  <br /><br />
                  <p className="experience">Specialisations: Artificial Intelligence, Data Science and Analytics</p>
                </div>
              </div>
            </div>

            <div className="col-12" data-aos="fade-up" data-aos-delay="100">
              <div className="eduexp p-4">
                <div className="service border-hover shadow rounded-5 bg-dark" style={{ padding: '8%' }}>
                  <h3>Boston University</h3>
                  <h5>Summer Exchange Programme</h5>
                  <small className="text-brand">May 2023 – July 2023</small>
                  <br /><br />
                  <p className="experience">Deep Learning and Design Strategy & Software</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
