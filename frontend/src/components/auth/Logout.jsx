import { Navigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  // Remove the token from storage
  localStorage.removeItem("authToken");

  // Remove the token from Axios headers
  delete axios.defaults.headers.common["Authorization"];

  // Redirect to login page
  return <Navigate to="/login" />;
};

export default Logout;
