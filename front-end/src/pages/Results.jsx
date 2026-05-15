import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Results.css";

let Results = () => {
  let location = useLocation();

  let flights = location.state?.flights || [];
  let initialDate = location.state?.selectdate || "";

  // ✅ convert date to DD-MM-YYYY
  const formatToDDMMYYYY = (dateStr) => {
    if (!dateStr) return "";

    let parts = dateStr.split("-");

    if (parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD → DD-MM-YYYY
    }
    return dateStr;
  };

  let [selectedDate, setSelectedDate] = useState(
    formatToDDMMYYYY(initialDate));
  let [baseDate, setBaseDate] = useState(formatToDDMMYYYY(initialDate));

  let [filteredFlights, setFilteredFlights] = useState([]);

  // ✅ generate next 5 dates
  let getNextDates = (startDate) => {
    if (!startDate) return [];

    let parts = startDate.split("-");
    let base = new Date(parts.reverse().join("-"));

    if (isNaN(base)) return [];

    let dates = [];

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

  let dates = getNextDates(baseDate);

  // ✅ filter flights properly
  useEffect(() => {
    if (!selectedDate) return;

    let result = flights.filter((flight) => {
      let fDate = formatToDDMMYYYY(flight.date);
      return fDate === selectedDate;
    });

    setFilteredFlights(result);
  }, [selectedDate, flights]);

  // ✅ first load fix (agar selectedDate empty ho)
  useEffect(() => {
    if (!selectedDate && flights.length > 0) {
      setSelectedDate(formatToDDMMYYYY(flights[0].date));
    }
  }, [flights]);

  return (
    <>
      <div className="container">
        <h1>
          {flights[0]?.from} to {flights[0]?.to} Flights
        </h1>

        <p className="subtitle">
          {flights.length} Flights found between {flights[0]?.from} (
          {flights[0]?.fromCode}) to {flights[0]?.to} (
          {flights[0]?.toCode})
        </p>

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

        <div className="filters">
          <h3>Quick Filters</h3>
        </div>

        <div className="offer">
          <p>Get a full train fare refund</p>
          <span>₹0 cancellation fee</span>
        </div>

        {/* Flight List */}
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div className="train-card" key={index}>
              <div className="train-header">
                <h3>{flight.name}</h3>
                <span className="rating">⭐ 4.0</span>
              </div>

              <div className="train-time">
                <strong>{flight.departuretime || "00:20"}</strong>
                <span> → </span>
                <strong>{flight.arrivaltime || "02:35"}</strong>
                <p>-------</p>
              </div>

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
        ) : (
          <p className="no-results">
            No trains found for the selected date.
          </p>
        )}
      </div>
    </>
  );
};

export default Results;