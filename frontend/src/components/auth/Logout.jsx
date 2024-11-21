import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
} from "../utils/toastConfig";

const Logout = () => {
  // Remove the token from storage
  localStorage.removeItem("authToken");

  // Remove the token from Axios headers
  delete axios.defaults.headers.common["Authorization"];

  notifySuccess("Logged out successfully.");

  // Redirect to login page
  return <Navigate to="/login" />;
};

export default Logout;
