import React from "react";
function About(){
  return(
    <>

     <section class="about_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 px-0">
          <div class="img_container">
            <div class="img-box">
              <img src="images/about-img.jpg" alt="" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 px-0">
          <div class="detail-box">
            <div class="heading_container">
              <h2>Who Are We?</h2>
            </div>
            <p>
               We are a team of travel enthusiasts dedicated to making your journeys seamless and unforgettable.
                  From discovering new destinations to booking reliable services, our platform brings everything you need to plan the perfect trip.
                  Experience hassle-free travel with trusted support and personalized recommendations.
            </p>
            <div class="btn-box">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


    </>
  )
};

export default About;