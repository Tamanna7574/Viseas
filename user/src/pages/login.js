import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    Axios.post('http://localhost:6369/api/verify', {
      email: data.email,
      password: data.password
    })
      .then((response) => {
        if (response.data.msg) {
          Swal.fire({
            title: 'Oops…',
            text: response.data.msg,
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location = '/login';
          });
        } else {
          const user = {
            sname: response.data[0].name,
            email: data.email,
          };
          localStorage.setItem('mydata', JSON.stringify(user));
          Swal.fire({
            title: 'Success!',
            text: `Welcome ${response.data[0].name}`,
            icon: 'success',
            confirmButtonText: 'Continue',
          }).then(() => {
            window.location = '/';
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response?.data?.msg || 'Server error or network issue',
        });
      });
  };

  return (
    <>
      <section class="py-5" id="login" style={{
        background: 'url("/images/your-sunset-plane-bg.jpg") center center/cover no-repeat',
        minHeight: '100vh'
      }}>
        <div class="container py-lg-3">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="p-4 p-md-5 bg-white rounded-4 shadow">
                <h3 class="mb-4 text-center text-primary">Login to Your Account</h3>
                <form class="signin-form" onSubmit={handleSubmit(onSubmit)}>

                  <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control contact-input"
                      placeholder="Enter your email"
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

                  <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      class="form-control contact-input"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required"
                      })}
                    />
                    {errors.password && <p class="text-danger small">{errors.password.message}</p>}
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary btn-style">Login</button>
                    <a href="/register" class="btn btn-outline-secondary">Create Account</a>
                  </div>

                  <div class="mt-3 text-end">
                    <a href="/forgot" class="btn btn-link p-0">Forgot Password?</a>
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

export default Login;
