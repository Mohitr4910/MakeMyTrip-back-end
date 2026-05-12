import React, { useState } from "react";
import "./FlightForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FlightForm() {

  const navigate = useNavigate();

  const [flightData, setFlightData] = useState({
    name: "",
    source: "",
    from_location: "",
    destination: "",
    date: "",
    time: "",
  });

  const data = JSON.parse(localStorage.getItem("user"));
  const user = data?.user;

  let loggedin = user?.email;

  console.log("Logged-in Email:", loggedin);

  const handleChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (valid) {

     let api="http://127.0.0.1:8000/api/flights/"

      axios.post(api, {
        ...flightData,
        company_email: loggedin
      },{headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }})
      .then((res) => {

        console.log(res.data);

        alert("Flight added successfully!");

        navigate("/airline-dashboard");

      })
      .catch((err) => {

        console.log(err);

        alert("Flight add failed!");

      });

    }
  };

  return (
    <div className="flight-form-container">

      <form className="flight-form" onSubmit={handleSubmit}>

        <h1>Add Flight</h1>

        <div className="input-group">
          <label>Flight Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter flight name"
            value={flightData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Source</label>

          <input
            type="text"
            name="source"
            placeholder="Enter source"
            value={flightData.source}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>From Location</label>

          <input
            type="text"
            name="from_location"
            placeholder="From location"
            value={flightData.from_location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Destination</label>

          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
            value={flightData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">

          <div className="input-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={flightData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Time</label>

            <input
              type="time"
              name="time"
              value={flightData.time}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <button type="submit" className="submit-btn">
          Add Flight
        </button>

      </form>

    </div>
  );
}

export default FlightForm;