import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Header from "./Header.jsx";

function Layout() {
  return (
    <div>
      <Header />
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </div>
  );
}

export default Layout;
