import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function NavTabs() {
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            aria-label="Receipts page"
            end // Only match `/receipts`, not `/receipts/add`
            to="/receipts"
          >
            Receipts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            aria-label="Add page"
            to="add"
          >
            Add
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default NavTabs;
