import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

function App() {
  return (
    <div>
      <ToastContainer /*position="bottom-right"*/ />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
