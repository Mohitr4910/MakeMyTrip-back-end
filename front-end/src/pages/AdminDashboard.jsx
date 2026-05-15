import React from "react";
import "./AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();



  let loggedIn = localStorage.getItem("accessToken") ? true : false;
  const handleLogout = () => {
    let choice = confirm("Are you sure you want to logout?");
    if (!choice) return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <div className="top-header">

        <div>
          <h1>🛫 Admin Dashboard</h1>

          <p className="welcome-text">
            Welcome Back {user?.user?.username}
          </p>
        </div>

        <div className="header-right">

          <div className="admin-info">
            <h3>{user?.user?.username}</h3>
            <p>Superuser Panel</p>
          </div>

          {/* LOGOUT BUTTON */}

          
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-container">

        <Link to="/Airlines" className="link">

          <div className="card airlines-card">

            <div className="card-icon">🏢</div>

            <h2>Airlines</h2>

            <p>
              View and manage all airline companies
            </p>

          </div>

        </Link>

        <Link to="/allflights" className="link">

          <div className="card flights-card">

            <div className="card-icon">✈</div>

            <h2>Total Flights</h2>

            <p>
              Manage all available flights
            </p>

          </div>

        </Link>

        <Link to="/Users" className="link">

          <div className="card users-card">

            <div className="card-icon">👤</div>

            <h2>Total Users</h2>

            <p>
              Check all registered users
            </p>

          </div>

        </Link>

      </div>

      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="actions-grid">

          <Link to="/allflights" className="action-btn">
            ✈ Manage Flights
          </Link>

          <Link to="/airlines" className="action-btn">
            🏢 Manage Airlines
          </Link>

          <Link to="/users" className="action-btn">
            👤 Manage Users
          </Link>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;