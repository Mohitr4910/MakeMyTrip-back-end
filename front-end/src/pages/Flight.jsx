import React, { useState } from "react";
import "./Flight.css";
import plane from "../assets/header.png"; // plane PNG
import AnimatedContent from "../components/Animation";
import { useEffect } from "react";
import axios from "axios";
import Results from './Results';
import { useNavigate } from "react-router-dom";
import Paris from "../assets/eiffel-tower-night-paris-france-reflection-river-thames-4481x3365-8437.jpg";
import Dubai from "../assets/dubai-sheikh-zayed-5909x3996-21154.jpg";
import Maldives from "../assets/baros-maldives-island-seascape-tropical-beach-blue-sky-3840x2400-4325.jpg";
import London from "../assets/london-bridge-united-kingdom-river-thames-night-time-5760x3840-3316.jpg"; 


import IndiGo from "../assets/6E.png";
import AirIndia from "../assets/AI.png";
import AirIndiaExpress from "../assets/IX.png";
import Akasa from "../assets/QP.png";
import Alliance from "../assets/9I.png";
let Flight= () => {

  let [form, setform ]=useState({
    from:"",
    to:"",
    travellers:"",
    departure:"",
    return:""
  })
  let navigate = useNavigate();

    let [flights, setFlights] = useState([]);
        
    let manageform = (e) => {

    setform({ ...form, [e.target.name]: e.target.value })

  }
  
    let searchFlights = async (e) => {
    e.preventDefault();
  // let res = await axios.get("http://localhost:3000/flights", {
  //   params: {
  //     from: form.from,
  //     to: form.to,
  //     date: form.departure
  //   }
  // });
  let res = await axios.get("http://localhost:3000/flights");

let filtered = res.data.filter(flight =>
  flight.from.toLowerCase().includes(form.from.toLowerCase()) &&
  flight.to.toLowerCase().includes(form.to.toLowerCase())
 
);

setFlights(filtered);
console.log("Filtered Flights:", filtered);
navigate("/results", { state: { flights: filtered, selectdate: form.departure } });
// console.log(res.data);
// setFlights(res.data);
};

useEffect(() => {
  console.log("Updated Flights:", flights);
}, [flights]);



  return (
    <>
    <div className="hero">
      
       <AnimatedContent  direction="horizontal" distance={-400}
              duration={4}
              ease="power4.out">
     
      <div className="hero-content">
        <p className="tagline">ELEVATE YOUR TRAVEL JOURNEY</p>

        <h1>
          Experience <br />
          The Magic Of <br />
          Flight!
        </h1>

        <div className="hero-buttons">
          <button className="btn-primary">Book A Trip Now</button>
          <div className="play-btn">▶</div>
        </div>
      </div>
    </AnimatedContent>

 <AnimatedContent  direction="horizontal" distance={400}
              duration={4}
              ease="power4.out" className="plane">
     

      <img src={plane} alt="plane"/>
    </AnimatedContent>
    </div>


 <AnimatedContent  distance={50}
              duration={2}
              ease="power4.out">
           
<div className="search-container">
  <form className="search-box" onSubmit={searchFlights}>

    {/* FROM */}
    <div className="field">
      <label>From</label>
      <input
        type="text"
        name="from"
        placeholder="City or Station"
        onChange={manageform}
        required
      />
    </div>

    {/* SWAP ICON */}
    <div className="swap-icon">⇄</div>

    {/* TO */}
    <div className="field">
      <label>To</label>
      <input
        type="text"
        name="to"
        placeholder="City or Station"
        onChange={manageform}
        required
      />
    </div>
 
    {/* DATE */}
    <div className="field">
      <label>Departure Date</label>
      <input
        type="date"
        name="departure"
        onChange={manageform}
        required
      />
    </div>

    {/* BUTTON */}
    <button className="search-btn" type="submit">
      Search
    </button>

  </form>
</div>
     
              </AnimatedContent>


<div className="destinations">
  <h2>Popular Destinations</h2>
  <p>Explore top places with best deals</p>

  <div className="destination-cards">
    <div className="card">
      <img src={Paris} alt="Paris" />
      <h3>Paris</h3>
      <p>From ₹25,000</p>
    </div>

    <div className="card">
      <img src={Dubai} alt="Dubai" />
      <h3>Dubai</h3>
      <p>From ₹18,000</p>
    </div>

    <div className="card">
      <img src={Maldives} alt="Maldives" />
      <h3>Maldives</h3>
      <p>From ₹30,000</p>
    </div>

    <div className="card">
      <img src={London} alt="London" />
      <h3>London</h3>
      <p>From ₹40,000</p>
    </div>
  </div>
</div>


<div className="airlines-section">
  <h2>Popular Domestic Airlines</h2>

  <div className="airlines-box">
    <div className="airline">
      <img src={IndiGo} alt="IndiGo" />
      <p>IndiGo</p>
    </div>

    <div className="airline">
      <img src={AirIndia} alt="Air India" />
      <p>Air India</p>
    </div>

    <div className="airline">
      <img src={AirIndiaExpress} alt="Air India Express" />
      <p>Air India Express</p>
    </div>

    <div className="airline">
      <img src={Akasa} alt="Akasa Air" />
      <p>Akasa Air</p>
    </div>

    <div className="airline">
      <img src={Alliance} alt="Alliance Air" />
      <p>Alliance Air</p>
    </div>

  </div>
</div>

<div className="features">
  <h2>Why Choose TravelGo?</h2>

  <div className="feature-box">

    <div className="feature-card">
      <div className="front">
        <span>✈️</span> <h4>Best Flights</h4>
      </div>
      <div className="back">
        <p>We provide cheapest flights with top airlines and instant booking confirmation.</p>
      </div>
    </div>

    <div className="feature-card">
      <div className="front">
        <span>🏨</span> <h4>Top Hotels</h4>
      </div>
      <div className="back">
        <p>Choose from luxury to budget hotels with best deals and ratings.</p>
      </div>
    </div>

    <div className="feature-card">
      <div className="front">
        <span>💳</span> <h4>Easy Payments</h4>
      </div>
      <div className="back">
        <p>Multiple payment options including UPI, cards & EMI available.</p>
      </div>
    </div>

    <div className="feature-card">
      <div className="front">
        <span>📞</span> <h4>24/7 Support</h4>
      </div>
      <div className="back">
        <p>Our team is available anytime to help you with bookings & queries.</p>
      </div>
    </div>

  </div>
</div>




    
   </>
  );
};

export default Flight;