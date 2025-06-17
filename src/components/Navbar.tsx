import React, { useEffect } from 'react';

const Navbar = () => {
  // Collapse navbar manually when a link is clicked
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // If the navbar is expanded, collapse it
        if (navbarCollapse?.classList.contains('show')) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {
          if (navbarCollapse?.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).hide();
          }
        });
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="signature" src="/assets/images/Shannen signature.png" alt="Shannen signature" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#aboutme">About Me <i className="fas fa-user"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#education">Education <i className="fas fa-graduation-cap"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experience">Experiences <i className="fas fa-briefcase"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">Projects <i className="fas fa-code"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact <i className="fas fa-envelope"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
