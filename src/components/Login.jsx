import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      notifyError("All fields are required!");
      return;
    }
    if (!formData.email.includes("@")) {
      notifyError("Please enter a valid email!");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/login`, formData);

      if (response.status === 200) {
        // Assume you have received a token from the backend after login
        const token = response.data.token;

        // Store the token in LocalStorage (or SessionStorage) for persistence
        localStorage.setItem("token", token);

        // Set the token in Axios as a default header so all requests include it
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        notifySuccess("Logged in successfully.");
        navigate("/dashboard");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      console.log(error.response);
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">
            Login /{" "}
            <Link to="/signup" className="cta-btn">
              Sign Up
            </Link>
          </h1>
          <p className="lead">Login with existing account.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email address"
                onChange={handleInputChange} // Update formData state
                autoComplete="true"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder=""
                onChange={handleInputChange} // Update formData state
                autoComplete="true"
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-success">Login</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
