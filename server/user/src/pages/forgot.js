import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    Axios.post("http://localhost:6369/api/forgotpass", data)
      .then((response) => {
        if (response.data.msg) {
          Swal.fire({
            title: 'Oops...',
            text: response.data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Success!',
            text: 'Password reset link sent to your email.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <>
      <section class="py-5" id="forgot" style={{
        background: 'url("/images/your-sunset-plane-bg.jpg") center center/cover no-repeat',
        minHeight: '100vh'
      }}>
        <div class="container py-lg-3">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="p-4 p-md-5 bg-white rounded-4 shadow">
                <h3 class="mb-4 text-center text-primary">Forgot Password</h3>
                <form class="signin-form" onSubmit={handleSubmit(onSubmit)}>

                  <div class="mb-4">
                    <label for="email" class="form-label">Registered Email</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control contact-input"
                      placeholder="Enter your registered email"
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

                  <div class="d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary btn-style">Send Reset Link</button>
                    <a href="/login" class="btn btn-outline-secondary">Back to Login</a>
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

export default Forgot;
