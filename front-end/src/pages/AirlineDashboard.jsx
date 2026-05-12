import React from "react";
import "./AirlineDashboard.css";
import { Link } from "react-router-dom";

function AirlineDashboard() {
  const data = JSON.parse(localStorage.getItem("user"));

  // company data
  const user = data?.user;
  const company = user?.airline;

  let loggedin=user?.email 

  console.log("Logged-in Email:", loggedin);


  // dummy flights
  const flights = [
    {
      id: 1,
      flightNo: "AI-202",
      from: "Delhi",
      to: "Mumbai",
      status: "Active",
    },
    {
      id: 2,
      flightNo: "AI-404",
      from: "Bhopal",
      to: "Dubai",
      status: "Delayed",
    },
    {
      id: 3,
      flightNo: "AI-707",
      from: "Indore",
      to: "London",
      status: "Active",
    },
  ];

  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="navbar">
        <h1>✈ Airline Dashboard</h1>

        <div className="profile">
          <h3>{user?.name}</h3>
          <p>{company?.country}</p>
        </div>
      </div>

      {/* Company Card */}
      <div className="company-card">
        <div>
          <h2>{user?.name}</h2>
          <p>Premium Airline Management System</p>
        </div>

        <Link to="/FlightForm" className="add-btn">
          + Add Flight
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Flights</h3>
          <h1>120</h1>
        </div>

        <div className="stat-card">
          <h3>Active Flights</h3>
          <h1>98</h1>
        </div>

        <div className="stat-card">
          <h3>Cancelled</h3>
          <h1>12</h1>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <h1>$25K</h1>
        </div>
      </div>

      {/* Flights Table */}
      <div className="flight-section">
        <div className="section-header">
          <h2>Flights</h2>
          <button className="view-btn">View All</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Flight No</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNo}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>
                  <span
                    className={
                      flight.status === "Active"
                        ? "status active"
                        : "status delayed"
                    }
                  >
                    {flight.status}
                  </span>
                </td>

                <td>
                  <button className="edit-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AirlineDashboard;