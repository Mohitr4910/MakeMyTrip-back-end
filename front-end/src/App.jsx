import React from 'react'
import {Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Train from './pages/Train';
import Flight from './pages/Flight';
import Bus from './pages/Bus';
import Login from './pages/login';
import Signup from './pages/signup';
import Results from './pages/Results';
import AirlineDashboard from './pages/AirlineDashboard';


function App() {
  return (
  

      <Routes>
        <Route path="/" element={<Layout/>}>  
        <Route index element={<Flight />} />
        <Route path="flight" element={<Flight />} />
        <Route path="train" element={<Train/>} />
        <Route path="bus" element={<Bus />} />
        <Route path="results" element={<Results/>} />
        </Route>
        
        <Route path="airline-dashboard" element={<AirlineDashboard/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
      </Routes>
  )
}

export default App