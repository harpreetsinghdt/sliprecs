import "@fortawesome/fontawesome-free/css/all.min.css"; // For FontAwesome icons
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">Welcome to sliprecs</h1>
          <p className="lead">
            Effortlessly save and organize your receipts in one place!
          </p>
          <a href="#cta" className="cta-btn">
            Get Started ssdf ffsdfs
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
            effortlessly. Get started today. Its free!
          </p>
          <Link to="signup" className="cta-btn">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-light">
        <p>&copy; 2024 sliprecs. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;
