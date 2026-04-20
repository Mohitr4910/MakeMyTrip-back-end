import React from 'react'
import { useLocation } from 'react-router-dom';
import "./Results.css";
  import { useState, useEffect } from "react";


let Results = () => {
  let location = useLocation();

  let flights = location.state?.flights || [];
  let initialDate = location.state?.selectdate || "";

  console.log("Received Flights in Results:", flights);

   let [selectedDate, setSelectedDate] = useState(initialDate);
   let [filteredFlights, setFilteredFlights] = useState([]);

   console.log("Initial Selected Date:", selectedDate);

  useEffect(() => {
    let result=flights.filter(flight => flight.date === selectedDate);
    setFilteredFlights(result);
    console.log("Filtered Flights in useEffect:", result);
  }, [selectedDate, flights]);


  
 let getNextDates = (startDate) => {
  if (!startDate) return []; // ❗ handle empty

  let dates = [];

  // handle both formats
  let parts = startDate.includes("-") ? startDate.split("-") : [];

  let base;

  if (parts[0].length === 4) {
    // format: YYYY-MM-DD
    base = new Date(startDate);
  } else {
    // format: DD-MM-YYYY
    base = new Date(parts.reverse().join("-"));
  }

  if (isNaN(base)) return []; // ❗ invalid date guard

  for (let i = 0; i < 5; i++) {
    let next = new Date(base);
    next.setDate(base.getDate() + i);

    let d = String(next.getDate()).padStart(2, "0");
    let m = String(next.getMonth() + 1).padStart(2, "0");
    let y = next.getFullYear();

    dates.push(`${d}-${m}-${y}`);
  }

  return dates;
};
let dates = getNextDates(selectedDate);

console.log("Generated Dates:", dates);
// let dates = [
//   "20-04-2026",
//   "21-04-2026",
//   "22-04-2026",
//   "23-04-2026",
//   "24-04-2026"
// ];


// first date auto select
// useEffect(() => {
//   if (dates.length > 0) {
//     setSelectedDate(dates[0]);
//   }
// }, []);

// const filteredFlights = selectedDate
//   ? flights.filter((f) => f.date === selectedDate)
//   : flights;

  return (
<>
  <div className="container">
    
    <h1> {flights[0]?.from} to {flights[0]?.to} Trains</h1>
    <p className="subtitle">
      {flights.length} Trains found between {flights[0]?.from} ({flights[0]?.fromCode}) to {flights[0]?.to} ({flights[0]?.toCode})
    </p>

    {/* Date Tabs */}
 <div className="date-tabs">
  {dates.map((date, i) => (
    <div
      key={i}
      className={`tab ${selectedDate === date ? "active" : ""}`}
      onClick={() => setSelectedDate(date)} 
    >
      <p>{date}</p>
      <span>• Few Seats</span>
    </div>
  ))}
</div>

    {/* Filters */}
    <div className="filters">
      <h3>Quick Filters</h3>

      <div className="toggle-group">
        <label>
          <input type="checkbox" /> Best Available
        </label>
        <label>
          <input type="checkbox" /> Tatkal Only
        </label>
        <label>
          <input type="checkbox" /> AC Only
        </label>
      </div>
    </div>

    {/* Offer Banner */}
    <div className="offer">
      <p>Get a full train fare refund</p>
      <span>₹0 cancellation fee</span>
    </div>

    {/* Train Cards */}
    { filteredFlights.length > 0 ? (
      filteredFlights.map((train, index) => (
        <div className="train-card" key={index}>
          
          <div className="train-header">
            <h3>{train.name || "19019 BDTS HW EXP"}</h3>
            <span className="rating">⭐ 4.0</span>
        </div>

        <div className="train-time">
          <strong>{train.departure || "00:20"}</strong>
          <span> → </span>
          <strong>{train.arrival || "02:35"}</strong>
          <p>26h 15m</p>
        </div>

        {/* Seats */}
        <div className="seats">
          <div className="seat-box">
            <p>SL</p>
            <span>₹605</span>
            <small>Not Available</small>
          </div>

          <div className="seat-box">
            <p>3E</p>
            <span>₹1525</span>
            <small>Not Available</small>
          </div>

          <div className="seat-box">
            <p>3A</p>
            <span>₹2100</span>
            <small>Few Seats</small>
          </div>
        </div>

      </div>
    ))
  ): (
      <p className="no-results">No trains found for the selected date.</p>
    )}

  </div>
</>
  );
};

export default Results;