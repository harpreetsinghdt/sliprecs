import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For FontAwesome icons

const LandingPage = () => {
  // State to track whether the navbar is collapsed or expanded
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  // Toggle function to handle the button click
  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            ReceiptSaver
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleNavbar} // Toggle the navbar on button click
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isNavbarCollapsed ? "" : "show"
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#cta">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">Welcome to ReceiptSaver</h1>
          <p className="lead">
            Effortlessly save and organize your receipts in one place!
          </p>
          <a href="#cta" className="cta-btn">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="feature-section">
        <div className="container text-center">
          <h2 className="display-4 mb-5">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-icon">
                <i className="fas fa-camera"></i>
              </div>
              <h4 className="mt-3">Snap & Save</h4>
              <p>
                Quickly take pictures of your receipts and save them for future
                reference.
              </p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4 className="mt-3">Search & Organize</h4>
              <p>
                Easily search through your receipts and categorize them to stay
                organized.
              </p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <h4 className="mt-3">Cloud Sync</h4>
              <p>
                Access your receipts from any device, anytime, with seamless
                cloud synchronization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="text-center py-5">
        <div className="container">
          <h2 className="display-4 mb-4">Ready to Start Saving Receipts?</h2>
          <p className="lead mb-4">
            Join thousands of users who are organizing their receipts
            effortlessly. Get started today!
          </p>
          <a href="signup.html" className="cta-btn">
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-light">
        <p>&copy; 2024 ReceiptSaver. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
