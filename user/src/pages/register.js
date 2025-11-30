import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   var name= document.getElementById("name").value;
  //   var email= document.getElementById("email").value;
  //   var mobile= document.getElementById("mobile").value;
  //   var password= document.getElementById("password").value;
  //   var cpassword= document.getElementById("cpassword").value;

  //   if (password !== cpassword) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Password Mismatch',
  //       text: 'Password and Confirm Password do not match',
  //     });
  //     return;
  //   }

  //   Axios.post('http://localhost:6369/api/insert', {
  //     name: name,
  //     email:email,
  //     mobile:mobile,
  //     password:password,
  //   }).then((response) => {
  //     if (response.data.msg) {
  //       Swal.fire({
  //         title: 'Oops…',
  //         text: response.data.msg,
  //         icon: 'warning',
  //         confirmButtonText: 'OK',
  //       });
  //     } else {
  //       Swal.fire({
  //         title: 'Success!',
  //         text: 'User Registered Successfully!',
  //         icon: 'success',
  //         confirmButtonText: 'OK',
  //       }).then(() => {
  //         window.location = "/login";
  //       });
  //     }
  //   }).catch((error) => {
  //     Swal.fire({
  //       title: 'Error',
  //       text: 'Something went wrong!',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   });
  // };


  const onSubmit = (data) => {
    Axios.post("http://localhost:6369/api/insert", {
      name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.mobile
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "User Registered!!!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          window.location = "/login";
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Email already exists. Please use a different email."
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Server error or network issue"
          });
        }
      });
  };


  function Checkemail() {
    var email = document.getElementById("email").value;
    if (!email) return;

    Axios.post("http://localhost:6369/api/emailcheck", { email: email })
      .then((response) => {
        console.log("Email is available");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Email Already Exists",
            text: "Please use a different email address."
          });
          document.getElementById("email").value = "";
        } else {
          alert("Server error or network issue");
        }
      });
  }




  return (
    <>
    <section class="py-5" id="register" style={{
      background: 'url("/images/your-sunset-plane-bg.jpg") center center/cover no-repeat',
      minHeight: '100vh'
    }}>
      <div class="container py-lg-3">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="p-4 p-md-5 bg-white rounded-4 shadow">
              <h3 class="mb-4 text-center text-primary">Create an Account</h3>
              <form class="signin-form" onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-3">
                  <label For="name" class="form-label">Full Name</label>
                  <input type="text" id="name" name="name"class="form-control contact-input"
                    placeholder="Enter your full name"
                    {...register("name", {
                      required: "Name is Required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only letters are allowed"
                      }
                    })}
                  />
                  {errors.name && <p class="text-danger small">{errors.name.message}</p>}
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" id="email" name="email" class="form-control contact-input"
                    placeholder="Enter your email" onBlur={Checkemail}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email format"
                      }
                    })}
                  />
                  {errors.email && <p class="text-danger small">{errors.email.message}</p>}
                </div>

                <div class="mb-3">
                  <label for="mobile" class="form-label">Mobile Number</label>
                  <input type="tel" id="mobile" name="mobile" class="form-control contact-input"
                    placeholder="Enter your mobile number"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Enter 10 digit mobile number"
                      }
                    })}
                  />
                  {errors.mobile && <p class="text-danger small">{errors.mobile.message}</p>}
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" name="password"class="form-control contact-input"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[^\s]{6,}$/ ,

                        message: "Min 6 chars, with uppercase, lowercase, number, and symbol"
                      }
                    })}
                  />
                  {errors.password && <p class="text-danger small">{errors.password.message}</p>}
                </div>

                <div class="mb-4">
                  <label for="cpassword" class="form-label">Confirm Password</label>
                  <input type="password" id="cpassword" name="cpassword" class="form-control contact-input"
                    placeholder="Confirm your password"
                    {...register("cpassword", {
                      required: "Please confirm your password"
                    })}
                  />
                  {errors.cpassword && <p class="text-danger small">{errors.cpassword.message}</p>}
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <button type="submit" class="btn btn-primary btn-style">Register</button>
                  <a href="/login" class="btn btn-outline-secondary">Login</a>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Register;

