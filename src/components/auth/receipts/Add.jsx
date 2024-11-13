import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
} from "../../utils/toastConfig";

function AddReceiptForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!image) newErrors.image = "Receipt image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("amount", formData.amount);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("description", formData.description);
    // data.append("image", image);

    console.log(data);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/receipt/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      notifySuccess("Receipt added successfully!");
      setFormData({
        title: "",
        amount: "",
        date: "",
        location: "",
        description: "",
      });
      setImage(null);
      setErrors({});
      navigate("/receipts");
    } catch (error) {
      console.log(error.response.data);
      notifyError(error.response?.data?.message || "Failed to add receipt");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Receipt</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        {/* Amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <div className="invalid-feedback">{errors.amount}</div>
          )}
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <div className="invalid-feedback">{errors.location}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Receipt
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            onChange={handleImageChange}
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Add Receipt
        </button>
      </form>
    </div>
  );
}

export default AddReceiptForm;
