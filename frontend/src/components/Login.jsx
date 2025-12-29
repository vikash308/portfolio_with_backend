import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import server from "../Api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${server}/login`, details);

      localStorage.setItem("token", res.data.token);
      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      navigate("/admin", { replace: true });
    } catch {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={details.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={details.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
          <Link to="/">Back to Home</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
