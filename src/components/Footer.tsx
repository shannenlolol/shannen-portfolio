const Footer = () => {
  return (
    <footer className='bg-dark text-light pt-5 pb-4'>
      <div className='container'>
        <div className='row gy-4 align-items-start justify-content-between'>
          {/* Left Column: Name, Message, Socials */}
          <div className='col-md-6 col-lg-6'>
            <a className='navbar-brand' href='#'>
              <img
                className='signature w-50'
                src='/assets/images/Shannen signature copy.png'
                alt='Shannen signature'
              />
            </a>{" "}
            <p className='fw-semibold mb-3'>
              Thank you for visiting my website!
            </p>
            <ul className='list-unstyled d-flex gap-3'>
              <li>
                <a
                  className='text-white fs-4'
                  href='https://www.linkedin.com/in/shannen-lee-4b7301216/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <i className='ri-linkedin-box-line'></i>
                </a>
              </li>
              <li>
                <a
                  className='text-white fs-4'
                  href='https://github.com/shannenlolol'
                  target='_blank'
                  rel='noreferrer'
                >
                  <i className='ri-github-line'></i>
                </a>
              </li>
              <li>
                <a
                  className='text-white fs-4'
                  href='https://t.me/shannenlolol'
                  target='_blank'
                  rel='noreferrer'
                >
                  <i className='ri-telegram-line'></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Info */}
          <div className='col-md-5 col-lg-5'>
            <h5 className='fw-bold text-white mb-3'>Contact</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>Email: shannenlee21@yahoo.com</li>
              <li>Phone: (+65) 83636218</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
