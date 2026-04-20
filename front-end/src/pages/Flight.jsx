import React, { useState } from "react";
import "./Flight.css";
import plane from "../assets/header.png"; // plane PNG
import AnimatedContent from "../components/Animation";
import { useEffect } from "react";
import axios from "axios";
import Results from './Results';
import { useNavigate } from "react-router-dom";

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

 <div className="flight-container">
        <div className="overlay">
          
          {/* ✅ FORM START */}
          <form className="form-box" onSubmit={searchFlights}>

            <div className="form-group">
              <label>From</label>
              <input type="text" name="from" onChange={manageform} placeholder="City or Airport" required />
            </div>

            <div className="form-group">
              <label>To</label>
              <input type="text" name="to" onChange={manageform} placeholder="City or Airport" required />
            </div>

            <div className="form-group">
              <label>Travellers</label>
              <input type="number" name="travellers" onChange={manageform} placeholder="Number of Travellers" required />
            </div>

            <div className="form-group">
              <label>Departure</label>
              <input type="date" name="departure" onChange={manageform} required />
            </div>

            <div className="form-group">
              <label>Return</label>
              <input type="date" name="return" onChange={manageform} required />
            </div>

            <div className="form-group btn">
              <button type="submit">Search</button>
            </div>

          </form>


        </div>
      </div>


    
   </>
  );
};

export default Flight;