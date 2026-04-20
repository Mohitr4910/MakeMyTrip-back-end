import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let Submit = (e) => {
    e.preventDefault();

    let email = form.email.trim();
    let pass = form.password.trim();
    let valid = true;

    if (email === "" || pass === "") {
      alert("Please fill in all fields!");
      valid = false;
      return;
    } else if (!(email.includes("@") && email.includes(".com"))) {
      alert("Please enter a valid email!");
      valid = false;
      return;
    }

    if (valid) {
      let api = "http://localhost:3000/users";

      axios.get(api).then((res) => {
        let users = res.data;
        console.log(users);

        let emailExists = users.some(
          (user) => user.email === form.email
        );

        if (!emailExists) {
          alert("Email not found! signup first");
          navigate("/signup");
        }

        let user = users.find(
          (user) => user.email === form.email
        );

        if (user.password !== form.password) {
          alert("Incorrect password! try again");
          return;
        }

        alert("Login Successful ✅");
        localStorage.setItem("userEmail", user.email);

        navigate("/");
      });

    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={Submit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;