import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:6369/api/service_get')
      .then((res) => setServices(res.data));
  }, []);

  const bookService = (id, price) => {
    const userData = JSON.parse(localStorage.getItem("mydata"));
    const email = userData?.email;
    if (!email) {
      Swal.fire("Login Required", "Please log in first!", "warning");
      return window.location = "/Login";
    }

    Swal.fire({
      title: 'Confirm Booking',
      text: `Proceed to pay ₹${price}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pay Now',
    }).then((result) => {
      if (result.isConfirmed) {
        const options = {
          key: "rzp_test_60v2W0km5tB9fH",
          amount: price * 100,
          currency: "INR",
          name: "Viseas",
          description: "Service Booking",
          handler: function () {
            Axios.post('http://localhost:6369/api/service_booking', {
              id, price, email
            }).then(() => {
              Swal.fire("Success", "Service booked successfully!", "success");
              // Optionally redirect or refresh
            }).catch(() => {
              Swal.fire("Oops", "Error saving booking!", "error");
            });
          },
          prefill: {
            email,
            name: "Viseas User",
            contact: "9999999999",
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    });
  };

  return (
<section class="service_section layout_padding">
  <div class="container">
    <div class="heading_container heading_center mb-5">
      <h2 class="fw-bold display-6 custom-heading">Our Services</h2>

    </div>
    <div class="row">
      {services.map((service) => (
        <div class="col-md-6 col-lg-4 mb-4" key={service.sid}>
          <div
  className="card h-100 text-center border-0 shadow-sm service-card"
  style={{
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "4px", 
    background: "#ffffff", 
    padding: "20px",
    minHeight: "200px", 
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0, 0, 0, 0.1)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
  }}
>
            <div class="d-flex justify-content-center">
              <img
                src={`http://localhost:6369/public/${service.image}`}
                alt={service.sname}
                class="rounded-circle mb-3"
                style={{
                  width: "85px",
                  height: "85px",
                  objectFit: "cover",
                  border: "3px solid #dee2e6",
                  padding: "4px",
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <div class="card-body px-2">
              <h5 class="card-title fw-bold text-dark mb-3" style={{ fontSize: "1.50rem" }}>
                <i class="bi bi-star-fill text-warning me-2"></i>
                {service.sname}
              </h5>

              <p class="card-text text-dark" style={{ fontSize: "1.1rem" ,fontWeight: "400", minHeight: "70px" }}>
                {service.description.length > 100
                  ? service.description.slice(0, 100) + "..."
                  : service.description}
              </p>

              <p class="mb-2 text-dark" style={{ fontWeight: "500" ,fontSize: "1.1rem" }}>
                <i class="bi bi-geo-alt-fill text-danger me-1"></i>City:  {service.city}
              </p>

              <h6 class="text-success fw-bold mt-2 mb-3 fs-5">
                <i class="bi bi-currency-rupee"></i>Price: ₹{service.price}
              </h6>

              <button
                class="btn btn-primary mt-auto px-4 py-2 rounded-pill fw-semibold"
                onClick={() => bookService(service.sid, service.price)}
              >
                <i class="bi bi-cart-check-fill me-1"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



  );
}

export default Service;
