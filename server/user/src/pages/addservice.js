import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function AddService() {
  const [filename, setFilename] = useState("");

  const postData = (e) => {
    e.preventDefault();

    const sname = document.getElementById("sname").value;
    const city = document.getElementById("city").value;
    const price = document.getElementById("price").value;
    const desc = document.getElementById("desc").value;

    let formData = new FormData();
    formData.append("image", filename);
    formData.append("sname", sname);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("desc", desc);

    Axios.post("http://localhost:6369/api/postservice", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (response.data.msg === "Service added successfully") {
      Swal.fire({
        title: "Success!",
        text: "Service added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Oops…",
        text: response.data.msg || "Something went wrong",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  })
  .catch((error) => {
    Swal.fire({
      title: "Error!",
      text: "Internal Server Error or Server not responding.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("Axios error:", error);
  });
}

  return (
    <>

    
      <section class="w3l-contact py-5" id="addservice">
        <div class="container py-lg-3">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="p-5 bg-white rounded-4 shadow">
                <h3 class="mb-4 text-center text-primary">Add New Service</h3>

                <div class="mb-3">
                  <label class="form-label">Service Name</label>
                  <input type="text" id="sname" name="sname" class="form-control" />
                </div>

                <div class="mb-3">
                  <label class="form-label">City</label>
                  <input type="text" id="city" name="city" class="form-control" />
                </div>

                <div class="mb-3">
                  <label class="form-label">Service Price</label>
                  <input type="number" id="price" name="price" class="form-control" />
                </div>

                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea
                    name="desc"
                    id="desc"
                    placeholder="Description..."
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>

                <div class="mb-4">
                  <label class="form-label">Service Image</label>
                  <input
                    type="file"
                    name="image"
                    class="form-control"
                    onChange={(e) => setFilename(e.target.files[0])}
                  />
                </div>

                <div class="text-center">
                  <button type="button" class="btn btn-primary" onClick={postData}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddService;
