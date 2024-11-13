import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavTabs() {
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            to="/receipts"
          >
            Receipts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            to="add"
          >
            Add
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default NavTabs;
