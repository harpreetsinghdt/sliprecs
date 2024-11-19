import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "../src/components/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/auth/Layout";
import Dashboard from "./components/auth/Dashboard.jsx";
import Profile from "./components/auth/Profile.jsx";
import Receipts from "./components/auth/receipts/Receipts.jsx";
import Settings from "./components/auth/Settings.jsx";
import Logout from "./components/auth/Logout.jsx";
import ReceiptAdd from "./components/auth/receipts/Add.jsx";
import ReceiptView from "./components/auth/receipts/View.jsx";
import ReceiptsNavTabs from "./components/auth/receipts/NavTabs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/", // Root path to auth layout
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/receipts",
            element: <ReceiptsNavTabs />,
            children: [
              {
                path: "",
                element: <Receipts />,
              },
              {
                path: "add",
                element: <ReceiptAdd />,
              },
              {
                path: "View",
                element: <ReceiptView />,
              },
            ],
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
