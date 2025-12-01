import React from "react";

function Countries() {
  return (
    <>
      <section className="country_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Choose Country</h2>
            <p>Select country you want to apply visa for</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <a href="https://france-visas.gouv.fr/en_US/web/france-visas/" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c1.jpg" alt="France" />
                <div className="detail-box"><h3>France</h3></div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c2.jpg" alt="Canada" />
                <div className="detail-box"><h3>Canada</h3></div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://travel.state.gov/content/travel/en/us-visas.html" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c3.jpg" alt="United States" />
                <div className="detail-box"><h3>United States</h3></div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://www.immigration.govt.nz/new-zealand-visas" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c4.jpg" alt="New Zealand" />
                <div className="detail-box"><h3>New Zealand</h3></div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c5.jpg" alt="Australia" />
                <div className="detail-box"><h3>Australia</h3></div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://www.spainvisa.eu/" target="_blank" rel="noopener noreferrer" className="box">
                <img src="images/c6.jpg" alt="Spain" />
                <div className="detail-box"><h3>Spain</h3></div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Countries;
