import React, { useEffect, useState } from "react";
import "./AirlineDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AirlineDashboard() {

  const [flights, setFlights] = useState([]);

  const data = JSON.parse(localStorage.getItem("user"));

  // company data
  const user = data?.user;
  const company = user?.airline;

  let loggedin = user?.email;

  // token
  const accessToken = data?.access;

  console.log("Logged-in Email:", loggedin);

  useEffect(() => {

    const fetchFlights = async () => {

      try {

        let res = await axios.get(
          "http://127.0.0.1:8000/api/flights/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        let companyFlights = res.data.filter(
          (flight) => flight.company_email === loggedin
        );

        console.log("Company Flights:", companyFlights);

        setFlights(companyFlights);

      } 
      catch (err) {

        console.log("error", err.response?.data);

      }

    };

    fetchFlights();

  }, []);

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
          <h1>{flights.length}</h1>
        </div>

        <div className="stat-card">
          <h3>Active Flights</h3>
          <h1>{flights.length}</h1>
        </div>

        <div className="stat-card">
          <h3>Cancelled</h3>
          <h1>0</h1>
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
              <th>Name</th>
              <th>Source</th>
              <th>From</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {flights.map((flight) => (

              <tr key={flight.id}>

                <td>{flight.name}</td>
                <td>{flight.source}</td>
                <td>{flight.from_location}</td>
                <td>{flight.destination}</td>
                <td>{flight.date}</td>
                <td>{flight.time}</td>

                <td>
                  <button className="edit-btn">
                    Update
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>
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