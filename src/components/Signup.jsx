import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const Signup = () => {
  // Function to show success notification
  // const notifySuccess = () =>
  // toast.success("Success! Your action was successful!");
  const toastConfig = {
    // position: toast.POSITION.TOP_RIGHT, // Correct enum usage
    autoClose: 2000, // Close the toast after 3 seconds
    hideProgressBar: false, // Optional to show progress bar
    pauseOnHover: true, // Pause the auto-close when hovering over the toast
  };
  const notifySuccess = (msg) => {
    toast.success(msg, toastConfig);
  };

  // Function to show error notification
  const notifyError = (msg) => toast.error(msg, toastConfig);

  // Function to show info notification
  const notifyInfo = (msg) => toast.info(msg, toastConfig);

  // Function to show warning notification
  const notifyWarning = (msg) => toast.warning(msg, toastConfig);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target; // Get the name and value of the input field

    setFormData({
      ...formData, // Keep existing data
      [name]: value, // Update the specific field with new value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page refresh)

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.cpassword
    ) {
      notifyError("All fields are required!");
      // notifyInfo();
      // notifyWarning();
      return;
    }
    if (!formData.email.includes("@")) {
      notifyError("Please enter correct email!");
      return;
    }
    if (formData.password !== formData.cpassword) {
      notifyError("Passwords do not match!");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/signup`, formData);
      if (response.status === 200) {
        notifySuccess("Signed up successfully.");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      notifyError("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">Login / Signup</h1>
          <p className="lead">
            Login with existing account or create new account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter full name"
                onChange={handleInputChange} // Update formData state
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email address"
                onChange={handleInputChange} // Update formData state
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Email mobile number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                name="mobile"
                placeholder="Enter 10 digits only"
                onChange={handleInputChange} // Update formData state
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Choose password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder=""
                onChange={handleInputChange} // Update formData state
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder=""
                onChange={handleInputChange} // Update formData state
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
