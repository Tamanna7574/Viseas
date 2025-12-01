import React from 'react';
function Footer() {
  return(
    <>
    
  <section class="info_section">
    <div class="container">
      <div class="row">
        <div class="col-md-3 info_logo">
          <a class="navbar-brand" href="index.html"><span>Viseas</span></a>
          <p>Explore the world with comfort, safety, and style. Let Viseas be your travel guide.</p>

        </div>
        <div class="col-md-3 info_links">
          <h5>Useful Link</h5>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/packages">Travel Packages</a></li>
            <li><a href="/contact">Contact</a></li>

          </ul>
        </div>
        <div class="col-md-3 info_info">
          <h5>Contact Us</h5>
          <div class="info_contact">
            <a href="#"><i class="fa fa-map-marker"></i><span>123 Seaside Blvd, Oceanview City, Country</span>
            </a>
            <a href="#phone"><i class="fa fa-phone"></i><span>Call : +01 1234567890</span></a>
            <a href="#envelope"><i class="fa fa-envelope"></i><span>info@viseas.com</span></a>
          </div>
        </div>
        <div class="col-md-3 info_form">
          <h5>Newsletter</h5>
          <form action="#">
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button></form>
          <div class="social_box">
            <a href="#facebook"><i class="fa fa-facebook"></i></a>
            <a href="#twitter"><i class="fa fa-twitter"></i></a>
            <a href="#youtube"><i class="fa fa-youtube"></i></a>
            <a href="#instagram"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <footer class="container-fluid footer_section">
    <p>&copy; <span id="displayYear"></span> All Rights Reserved By <a href="https://html.design/">Free Html Templates</a></p>
  </footer>
    
    </>
  )
}

export default Footer;