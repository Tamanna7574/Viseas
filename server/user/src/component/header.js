import React from 'react';
function Header() {

  function logout() {
    localStorage.clear();
    window.location = "/"
  }
  let user = JSON.parse(localStorage.getItem('mydata'));


  return(
    <>
    
     <div
        className="hero_bg_box"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div> 
     
  <header class="header_section">
<header class="header_section">
  <div class="header_top">
    <div class="container-fluid">
      <div class="contact_link-container">
        <a href="#" class="contact_link1">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>123 Seaside Blvd, Oceanview City, Country</span>
        </a>
        <a href="tel:+919987654321" class="contact_link2">
          <i class="fa fa-phone" aria-hidden="true"></i>
          <span>Call: +91 99876 54321</span>
        </a>
        <a href="mailto:info@viseas.com" class="contact_link3">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <span>info@viseas.com</span>
        </a>
      </div>
    </div>
  </div>
</header>



    <div class="header_bottom">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <a class="navbar-brand" href="#heading">
            <span>Viseas</span>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span class=""></span>
          </button>
          <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/service">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/countries">Countries</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">Contact us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/addservice">Add Service</a>
              </li>
             
            </ul>
          </div>

       
{
  localStorage.getItem("mydata") == null ?
  <>
    <div class="d-lg-block d-none">
      <a href="/register" class="btn btn-primary">Register</a>
    </div>
  </>
  :
  <>
    <div class="d-lg-block d-none">
      <a href="/register" class="btn btn-dark">Welcome: {user && user.sname}</a>
    </div>

    <div class="d-lg-block d-none ms-2">
      <a href="#" class="btn btn-danger" onClick={logout}>Logout</a>
    </div>
  </>
}



        </nav>
      </div>
    </div>
  </header>
    
    </>
  )
}

export default Header;