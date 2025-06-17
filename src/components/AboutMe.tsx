// src/components/AboutMe.tsx
import React from 'react';
import { useEffect } from 'react';

function ElfsightWidget() {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://apps.elfsight.com/p/platform.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://apps.elfsight.com/p/platform.js';
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="shopig" style={{ width: '100%' }}>
      <div
        className="elfsight-app-7363d9f9-611d-4270-bd29-de32e5d216bf"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      ></div>
    </div>
  );
}


const AboutMe = () => {
  return (
    <section id="aboutme" className="section-padding section-connector" style={{ marginTop: '20%' }}>
      <div style={{ width: '90%', height: '100%', margin: '0 auto' }}>
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center" data-aos="fade-up" data-aos-delay="100">
              <br />
              <h1>About Me</h1>
              <div className="line"></div>
            </div>
          </div>

<div
  className="row align-items-center justify-content-center"
  style={{ height: '100%', margin: '0 auto', columnGap: '5%' }}
>
  {/* Left: Profile Picture */}
  <div className="col-md-4">
    <div
      className="portfoliopic mb-4"
      data-aos="fade-up"
      data-aos-delay="100"
      style={{
        position: 'relative',
        zIndex: 10,
      }}
    >
      <img src="/assets/images/profilepic.png" alt="Profile" className="img-fluid rounded-circle" />
    </div>
  </div>

  {/* ✅ Right: Graduation Box, now inside col-md-8 */}
<div className="col-md-8" data-aos="fade-up" data-aos-delay="100">
    <div
      className="service border-hover shadow rounded-5 bg-dark graduation-box text-white"
      style={{ padding: '8%' }}
    >
      <h5 className="fw-bold">
        Graduated from Nanyang Technological University
      </h5><br />
      <p className="mb-0">
        Bachelor of Computing in Computer Science (Honours with Distinction)
        <br /><br />
        Specialised in Artificial Intelligence and Data Science & Analytics
      </p>
    </div>
  </div>
</div>

<div className="container my-5">
  <div className="row gy-4 align-items-center justify-content-center" style={{ marginTop: '8%'}}>
    {/* LEFT SIDE: Caption + Widget */}
  <div
  className="col-lg-4 col-md-12 d-flex flex-column justify-content-center"
  style={{
    height: '100%',
    gap: '2rem', // Adjust spacing between caption and widget
  }}
>


      <div
        className="shopcaption border-hover shadow rounded-5 bg-dark text-white text-center text-lg-start mb-4"
        style={{ lineHeight: '1.6', letterSpacing: '0.3px', padding: '8%' }}
      >
        <h5 className="fw-bold">
          I was a small business owner!
        </h5>
        <p className="mb-0">
          <br />My online store sold curated secondhand clothing. <br /><br />
          I have also been interviewed by Lian He Zao Bao.
        </p>
      </div>

<div className="shopig d-flex justify-content-center" style={{ width: '100%' }}>
  <div
    className="responsive-widget-container"
    style={{
      width: '100%',
      height: 'auto', // Let content dictate height
      maxWidth: '100%', // Ensure no overflow
    }}
  >
    <ElfsightWidget />
  </div>
</div>


    </div>

    {/* RIGHT SIDE: Newspaper */}
    <div className="col-lg-4 col-md-12">
<div className="project text-center shadow-lg rounded-5 bg-white px-2 py-3" style={{ padding: '1rem' }}>
<img
  src="/assets/images/shopwithkkumanews.jpg"
  alt="Lianhe Zaobao article"
  className="img-fluid rounded"
  style={{
    width: '100%',
    height: 'auto',
    maxWidth: '600px', // optional max cap
    display: 'block',
    margin: '0 auto',
  }}
/>


        <div className="content">
          <a
            href="/assets/images/shopwithkkuma lianhezaobao.pdf"
            className="btn btn-outline-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the article!
          </a>
        </div>
      </div>
    </div>
  </div>
</div>





        </div>
      </div>
    </section>
  );
};

export default AboutMe;
