import React, { useState } from "react";
import axios from "../Untils/axiosInstance";

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

  const Submit = (e) => {

    e.preventDefault();

    let email = form.email.trim();
    let pass = form.password.trim();

    if (email === "" || pass === "") {
      alert("Please fill in all fields!");
      return;
    }

    if (!(email.includes("@") && email.includes(".com"))) {
      alert("Please enter a valid email!");
      return;
    }

    axios.post("http://127.0.0.1:8000/api/login/", {
      email: form.email,
      password: form.password,
    })

    .then((res) => {

      console.log(res.data);

      alert("Login Successful ✅");

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data));

      const user = res.data.user;

      console.log("Superuser:", user?.is_superuser);

      if (user?.is_superuser) {

        navigate("/admin-dashboard");

      } else if (res.data.role === "company") {

        navigate("/airline-dashboard");

      } else {

        navigate("/");

      }

    })

    .catch((err) => {

      console.log(err.response?.data);

      alert(err.response?.data?.message || "Login failed ❌");

    });

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