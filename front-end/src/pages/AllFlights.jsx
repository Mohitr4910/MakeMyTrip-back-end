import React, { useEffect, useState } from "react";
import axios from "../Untils/axiosInstance";

import "./AllFlights.css";

let AllFlights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        let res = await axios.get(
          "http://127.0.0.1:8000/api/flights/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );

        setFlights(res.data);
      } catch (err) {
        console.log("error", err.response?.data);
      }
    };

    fetchFlights();
  }, []);
    console.log("All Flights:", flights);
  return (
    <div className="allflights-page">
      <div className="flights-header">
        <h1>✈ All Flights</h1>
        <p>Manage and view all available flights</p>
      </div>

      <div className="flights-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <tr key={flight.id}>
                  <td>{index + 1}</td>
                  <td>{flight.source}</td>
                  <td>{flight.from_location}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.time}</td>
                  <td>{flight.date}</td>
                  <td>₹ {flight.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Flights Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFlights;