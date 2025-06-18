// src/components/Education.tsx
const Education = () => {
  return (
    <section id='education' className='section-padding section-connector'>
      <div className='container'>
        <div className='row'>
          <div className='col-12' data-aos='fade-up' data-aos-delay='100'>
            <div className='section-title text-center'>
              <br />
              <h1>Education</h1>
              <div className='line'></div>
            </div>
          </div>
        </div>

        <div className='row align-items-stretch gy-5 gx-lg-5 mt-4'>
          {/* Left: Carousel (Mobile first, reorder for large screens) */}
          <div className='col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center'>
            <div className='w-100' data-aos='fade-up' data-aos-delay='100'>
              <div
                id='imageCarousel'
                className='carousel slide shadow rounded-4'
                data-bs-ride='carousel'
              >
                <div className='carousel-inner rounded-4 overflow-hidden'>
                  <div className='carousel-item active'>
                    <img
                      src='/assets/images/ntu_friends.jpeg'
                      className='d-block w-100'
                      alt='NTU friends'
                      style={{ objectFit: "cover", maxHeight: "500px" }}
                    />
                  </div>
                  <div className='carousel-item'>
                    <img
                      src='/assets/images/MDP.png'
                      className='d-block w-100'
                      alt='MDP certificate'
                      style={{ objectFit: "cover", maxHeight: "500px" }}
                    />
                  </div>
                </div>
                <button
                  className='carousel-control-prev'
                  type='button'
                  data-bs-target='#imageCarousel'
                  data-bs-slide='prev'
                >
                  <span className='carousel-control-prev-icon'></span>
                </button>
                <button
                  className='carousel-control-next'
                  type='button'
                  data-bs-target='#imageCarousel'
                  data-bs-slide='next'
                >
                  <span className='carousel-control-next-icon'></span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Education entries */}
          <div className='col-lg-6 order-2 order-lg-1 d-flex flex-column gap-4'>
            {/* AWS Badge */}
            <div
              className='service border-hover shadow rounded-5 bg-dark'
              style={{ padding: "8%" }}
            >
              <div className='d-flex align-items-center mb-3 gap-3'>
                <img
                  src='/assets/images/aws.png'
                  alt='NTU Logo'
                  style={{
                    maxHeight: "100px",
                    height: "auto",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <h4 className='fw-bold mb-1'>
                  AWS Certified Machine Learning Engineer - Associate
                </h4>
              </div>
              <h6 className='text-info mb-2'>Amazon Web Services</h6>
              <small className='text-brand d-block mb-3'>
                Obtained in May 2025
              </small>
              <p className='mb-0'>
                This certification validates expertise in building, training,
                tuning, and deploying machine learning models using AWS
                services.
              </p>

              <a
                className='btn btn-primary btn-sm mt-3'
                href='https://www.credly.com/badges/0fb77826-915f-4f24-91f7-ad6289124323/public_url'
                target='_blank'
              >
                View Credential
              </a>
            </div>

            {/* NTU */}
            <div
              className='service border-hover shadow rounded-5 bg-dark'
              style={{ padding: "8%" }}
            >
              <div className='d-flex align-items-center mb-3 gap-3'>
                <img
                  src='/assets/images/NTU.png'
                  alt='NTU Logo'
                  style={{
                    maxHeight: "100px",
                    height: "auto",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <h4 className='mb-0 text-white'>
                  Nanyang Technological University
                </h4>
              </div>
              <h6 className='text-info'>
                Bachelor of Computing in Computer Science
              </h6>
              <small className='text-brand d-block mb-2'>
                Aug 2020 – Dec 2024
              </small>
              <p className='mb-0'>
                Specialisations: Artificial Intelligence, Data Science and
                Analytics
              </p>
            </div>

            {/* BU */}
            <div
              className='service border-hover shadow rounded-5 bg-dark'
              style={{ padding: "8%" }}
            >
              <div className='d-flex align-items-center mb-3 gap-3'>
                <img
                  src='/assets/images/BU.png'
                  alt='BU Logo'
                  style={{
                    maxHeight: "100px",
                    height: "auto",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <h4 className='mb-0 text-white'>Boston University</h4>
              </div>
              <h6 className='text-info'>Summer Exchange Programme</h6>
              <small className='text-brand d-block mb-2'>
                May 2023 – July 2023
              </small>
              <p className='mb-0'>
                Deep Learning and Design Strategy & Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
