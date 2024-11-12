import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  // Remove the token from storage
  localStorage.removeItem("token");

  // Remove the token from Axios headers
  delete axios.defaults.headers.common["Authorization"];

  // Redirect to login page
  navigate("/login");
};

export default Logout;
