// src/components/Projects.tsx
const Projects = () => {
  return (
    <section id='projects' className='section-padding section-connector'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12' data-aos='fade-up' data-aos-delay='100'>
            <div className='section-title text-center'>
              <br />
              <h1>Projects</h1>
              <div className='line'></div>
              <br />
              <p>Showcasing some of my personal projects that I have done.</p>
            </div>
          </div>
        </div>

        <div className='row g-1'>
          <div
            className='col-12 col-sm-6 col-lg-4 mb-2'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='project rounded-4 overflow-hidden shadow-sm'>
              <img
                src='/assets/images/mealmacroinsights.jpeg'
                alt='Meal Macro Insights'
                className='img-fluid w-100'
                style={{ borderRadius: "12px" }}
              />
              <div className='content p-2 text-center'>
                <a
                  href='https://github.com/shannenlolol/meal-macro-insights'
                  className='btn btn-outline-light btn-sm'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Project
                </a>
              </div>
            </div>
          </div>

          <div
            className='col-lg-4 col-sm-6 mb-2'
            data-aos='fade-up'
            data-aos-delay='100'
          >
            <div className='project rounded-4 overflow-hidden shadow-sm'>
              <img
                src='/assets/images/background_removal.png'
                alt='Image Editor'
                className='img-fluid w-100'
                style={{ borderRadius: "12px" }}
              />
              <div className='content p-2 text-center'>
                <a
                  href='https://shannenlolol.pythonanywhere.com/'
                  className='btn btn-outline-light btn-sm'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Project
                </a>
              </div>
            </div>
          </div>

          <div
            className='col-lg-4 col-sm-6 mb-2'
            data-aos='fade-up'
            data-aos-delay='300'
          >
            <div className='project rounded-4 overflow-hidden shadow-sm'>
              <img
                src='/assets/images/grocery-guru.jpeg'
                alt='Grocery Guru'
                className='img-fluid w-100'
                style={{ borderRadius: "12px" }}
              />
              <div className='content p-2 text-center'>
                <a
                  href='https://github.com/shannenlolol/grocery-guru'
                  className='btn btn-outline-light btn-sm'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className='section-title text-center'
          data-aos='fade-up'
          data-aos-delay='100'
        >
          <p>View more projects here:</p>
          <a
            className='btn btn-light btn-sm'
            role='button'
            aria-pressed='true'
            href='https://github.com/shannenlolol'
            style={{ width: "30%" }}
          >
            <img src='/assets/images/github.png' alt='GitHub' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
