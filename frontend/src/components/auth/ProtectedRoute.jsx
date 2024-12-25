import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  // Check if the token exists. If not, redirect to login.
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected component)
  return children;
}

export default ProtectedRoute;
