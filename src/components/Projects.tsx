// src/components/Projects.tsx
import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="section-padding section-connector">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" data-aos="fade-up" data-aos-delay="100">
            <div className="section-title text-center">
              <br />
              <h1>Projects</h1>
              <div className="line"></div>
              <br />
              <p>Showcasing some of my personal projects that I have done.</p>
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-lg-4 col-sm-6" data-aos="fade-up" data-aos-delay="100">
            <div className="project">
              <img src="/assets/images/DrumKit.png" alt="Drum Kit" />
              <div className="content">
                <a href="https://drum-kit-beta-blue.vercel.app/" className="btn btn-outline-light">View Project</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6" data-aos="fade-up" data-aos-delay="200">
            <div className="project">
              <img src="/assets/images/SimonGame.png" alt="Simon Game" />
              <div className="content">
                <a href="https://simon-game-pearl-phi.vercel.app/" className="btn btn-outline-light">View Project</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6" data-aos="fade-up" data-aos-delay="300">
            <div className="project">
              <img src="/assets/images/todolist.jpg" alt="To-do List" />
              <div className="content">
                <a href="https://to-do-list-shannen.herokuapp.com/" className="btn btn-outline-light">View Project</a>
              </div>
            </div>
          </div>
        </div>

        <br /><br /><br /><br /><br /><br />

        <div className="section-title text-center" data-aos="fade-up" data-aos-delay="100">
          <p>View more projects here:</p>
          <a className="btn btn-light btn-sm" role="button" aria-pressed="true" href="https://github.com/shannenlolol" style={{ width: '30%' }}>
            <img src="/assets/images/github.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;