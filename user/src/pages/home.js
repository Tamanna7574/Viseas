import React from 'react';

function Home() {
  return (

    
    <section className="home-section">
      <div className="overlay-content">
        <h1 className="headline">
          Your Journey Begins with <span className="highlight">Viseas</span>
        </h1>
        <p className="subheading">
          Fly beyond borders. Travel with comfort and peace of mind.
        </p>
        <div className="buttons">
          <a href="/service" className="btn primary-btn">Explore Services</a>
          <a href="/contact" className="btn secondary-btn">Contact Us</a>
        </div>
      </div>
    </section>
  );
}

export default Home;
