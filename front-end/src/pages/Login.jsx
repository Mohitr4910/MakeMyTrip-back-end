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
      // let api="http://127.0.0.1:8000/api/users/"

        axios.post("http://127.0.0.1:8000/api/login/", {
        email: form.email,
        password: form.password
        })
        .then((res) => {
        console.log(res.data);

        alert("Login Successful ✅");

        // ✅ Token store
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("email", res.data.email);
        console.log("user:", res.data);
        // console.log("Access Token:", res.data.access);
        // console.log("Refresh Token:", res.data.refresh);
        // console.log("User Email:", res.data.email);
        // console.log("Role:", res.data.role);



const user = res.data.user;

console.log("Superuser:", user?.is_superuser);

if (user?.is_superuser) {

    navigate("/admin-dashboard");

} 
else if (res.data.role === "company") {

    navigate("/airline-dashboard");

} 
else {

    navigate("/");

}

        })
        .catch((err) => {
        alert(err.response.data.error);
          console.log("Sending:", form.password);
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