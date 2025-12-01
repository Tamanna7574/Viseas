import React from "react";

function Contact() {
  return (
    <>
      <section className="contact_section layout_padding">
        <div class="contact_bg_box">
        <img src="images/contact-bg.jpg" alt=""/>
      </div>
      <div class="container">
        <div class="heading_container heading_center">
          <h2>Contact Us</h2>
        </div>
        <div class="row">
          <div class="col-md-9 mx-auto">
            <div class="form_container">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" placeholder="First Name" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" placeholder="Last Name" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="email" class="form-control" placeholder="Email" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" placeholder="Phone Number" />
                  </div>
                </div>
                <div class="form-group">
                  <input type="text" class="message-box" placeholder="Message" />
                </div>
                <div class="btn-box">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    


          {/* Map Section */}
          <div className="map mt-5 pt-md-5">
            <h1>MAP</h1>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387145.86654334463!2d-74.25818682528057!3d40.70531100753592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1493028309728"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
