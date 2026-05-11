import React, { useState } from "react";
import "./Signup.css";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

let Signup = () => {
  let [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  let navigate = useNavigate();

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let valid=true

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      valid=false;
      return;
    }


     if(valid){
       let api="http://127.0.0.1:8000/api/users/"
      axios.post(api, { name: form.name, contact: form.contact, email: form.email, password: form.password }).then((res)=>{

        alert("Signup successful!");
        navigate("/login");
      }).catch((err)=>{
        console.log(err.response.data);
        alert("Signup failed! Please try again.");
      });


    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup