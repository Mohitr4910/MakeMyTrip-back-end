import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import userimage from "../assets/user-circles-set_78370-4704 copy.avif";
const Navbar = () => {

  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const loggedIn = localStorage.getItem("accessToken") ? true : false;

  // USER DATA
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("User Data:", user?.user?.username);

  // LOGOUT FUNCTION
  const handleLogout = () => {

    let choice = window.confirm(
      "Are you sure you want to logout?"
    );

    if (choice) {
      localStorage.clear();
      navigate("/");
      setSidebar(false)
    }
  };

  return (
    <>
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

        {/* AUTH / PROFILE */}
        <div className="auth">

          {loggedIn ? (
            <>
              {/* PROFILE BUTTON */}
              <button
                className="profile-btn"
                onClick={() => setSidebar(true)}
              >
                👤
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login">
                Login
              </Link>

              <Link to="/signup" className="signup">
                Signup
              </Link>
            </>
          )}

        </div>

      </nav>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebar ? "active" : ""}`}>

        <div className="sidebar-top">

          <h2>My Profile</h2>

          <button
            className="close-btn"
            onClick={() => setSidebar(false)}
          >
            ✖
          </button>

        </div>

        <div className="profile-info">

          <img
            src={userimage}
            alt="profile"
          />

          <h3>{ user?.user?.username}</h3>
          <p>{user?.user?.email}</p>

        </div>

        <div className="sidebar-links">

          <button onClick={() => navigate("/")}>
            🏠 Dashboard
          </button>

          <button onClick={() => navigate("/bookings")}>
            🎫 My Bookings
          </button>



          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* OVERLAY */}
      {
        sidebar && (
          <div
            className="overlay"
            onClick={() => setSidebar(false)}
          ></div>
        )
      }
    </>
  );
};

export default Navbar;