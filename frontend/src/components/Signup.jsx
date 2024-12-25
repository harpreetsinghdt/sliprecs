import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
} from "./utils/toastConfig.jsx";

const Signup = () => {
  const navigate = useNavigate(); // Hook to navigate to another pages

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    if (token) {
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [navigate]); // Empty dependency array ensures this runs only on component mount

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
    if (formData.name.length < 3) {
      notifyError("Name must be 3 or more characters!");
      return;
    }
    if (formData.mobile.length < 10) {
      notifyError("Mobile must be 10 digits!");
      return;
    }
    if (formData.password.length < 6) {
      notifyError("Password must be 6 or more characters!");
      return;
    }
    if (formData.password !== formData.cpassword) {
      notifyError("Passwords do not match!");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // const axiosInstance = await axios.create({
      //   baseURL: { apiUrl },
      //   withCredentials: true, // Include credentials like cookies if reuired
      // });

      const response = await axios.post(`${apiUrl}/signup`, formData);
      if (response.status === 200) {
        notifySuccess("Signed up successfully.");
        navigate("/login");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      console.log(error.response);
      // notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">
            <Link to="/login" className="cta-btn">
              Login
            </Link>{" "}
            / <b>Signup</b>
          </h1>
          <p className="lead">Create new account</p>
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
              <button className="btn btn-success">Signup</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
