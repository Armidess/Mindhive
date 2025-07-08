import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        {/* Left side - Logo */}
        <div className="logo-section">
          <div className="logo-circle">
            <div className="welcome-text">Welcome To</div>
            <div className="hive-mind-text">HIVE MIND</div>
          </div>
        </div>

        {/* Right side - Error Message */}
        <div className="error-section">
          <div className="error-box">
            <h2 className="error-title">Error, page not found</h2>
            <p className="error-message">
              Please go back to login
            </p>
            <div className="error-divider">
              <span>or</span>
            </div>
            <Link to="/signin" className="login-button">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;