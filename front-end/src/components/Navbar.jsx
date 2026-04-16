import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="logo">
        <Link to="/">TravelGo</Link>
      </div>

      {/* Menu */}
      <div className="menu">
        <Link to="/flight">✈️ Flight</Link>
        <Link to="/train">🚆 Train</Link>
        <Link to="/bus">🚌 Bus</Link>
      </div>

      {/* Auth Links */}
      <div className="auth">
        <Link to="/login" className="login">Login</Link>
        <Link to="/signup" className="signup">Signup</Link>
      </div>

    </nav>
  );
};

export default Navbar;