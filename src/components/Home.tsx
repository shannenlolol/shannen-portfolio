// src/components/Home.tsx
const Home = () => {
  return (
    <section
      id='home'
      className='section-padding section-connector'
      style={{ marginTop: "10%" }}
    >
      <div id='stars' />
      <div id='stars2' />
      <div id='stars3' />
      <div className='title' data-aos='fade-up'>
        <span>Hello, I'm Shannen.</span>
      </div>
      <div className='special-container'>
        <div className='planets-container'>
          <div className='sun'></div>
          {["first", "second", "third"].map((planet, idx) => (
            <div
              key={idx}
              className='planet-index'
              id={`${planet}-planet-index`}
            >
              <div className='route'>
                <div
                  className='planet-container'
                  id={`${planet}-planet-container`}
                >
                  <div className='planet' id={`${planet}-planet`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='phone-container'>
        <img
          style={{
            width: "80%",
            maxWidth: "500px",
            height: "auto",
            animation: "mover 2s infinite alternate",
          }}
          src='/assets/images/spacecat.png'
          alt='space cat'
        />
      </div>
    </section>
  );
};

export default Home;
