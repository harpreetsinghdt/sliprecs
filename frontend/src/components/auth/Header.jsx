import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Offcanvas,
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>{/* Offcanvas */}</div>

      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            sliprecs
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={handleShow}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>sliprecs h9 g df</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Link
                  to="/dashboard"
                  className="nav-link"
                  onClick={handleClose}
                >
                  Dashboard
                </Link>
                <Link to="/receipts" className="nav-link" onClick={handleClose}>
                  Receipts
                </Link>
                <Link to="/profile" className="nav-link" onClick={handleClose}>
                  Profile
                </Link>
                <Link to="/settings" className="nav-link" onClick={handleClose}>
                  Settings
                </Link>
                <Link to="/logout" className="nav-link" onClick={handleClose}>
                  Logout
                </Link>
              </Nav>
              {/* <Form className="d-flex mt-3" role="search">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </>
  );
};

export default Header;
