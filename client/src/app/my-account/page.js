"use client";

import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin from @react-oauth/google
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import "./style.css";

export default function MyAccount() {
  // States to control active form and button
  const [isLoginActive, setIsLoginActive] = useState(true); // Default form: Login
  const [isRegisterActive, setIsRegisterActive] = useState(false); // Register form is hidden initially
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Handle Google Login response
  const handleGoogleLogin = (response) => {
    const token = response.credential; // Google token from response
    axios
      .post(`${API_URL}/auth/google-login`, { token })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        localStorage.setItem("user", res.data.name);
        console.log(localStorage.getItem("user"));
        toast.success("Google Login Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        {/* Redirect to home page after successful login */}
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error("Google Login Failed", err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // Toggle between login and register forms
  const toggleForm = (formType) => {
    if (formType === "login") {
      setIsLoginActive(true);
      setIsRegisterActive(false);
    } else {
      setIsLoginActive(false);
      setIsRegisterActive(true);
    }
  };

  // handle regular form login
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.name);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="my-account">
      <div className="top">
        <h1>My Account</h1>
      </div>
      <div className="lower">
        <div className="toggle-buttons">
          <button
            type="button"
            className={isLoginActive ? "active" : ""}
            onClick={() => toggleForm("login")}
          >
            <div className="button-inner"></div>
            Login
          </button>
          <button
            type="button"
            className={isRegisterActive ? "active" : ""}
            onClick={() => toggleForm("register")}
          >
            <div className="button-inner"></div>
            Register
          </button>
        </div>

        <form
          className={`login-form ${isLoginActive ? "active" : ""}`}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <label>
            Email
            <input type="email" placeholder="Email" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" required />
          </label>
          <button type="submit">Login</button>
          <div className="google-login">
            {/* Google Login Button */}
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => console.log("Google Login Failed:", error)}
            />
          </div>
        </form>

        <form className={`register-form ${isRegisterActive ? "active" : ""}`}>
          <h2>Register</h2>
          <label>
            Full Name
            <input type="text" placeholder="Full Name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Email" />
          </label>
          <label>
            Create Password
            <input type="password" placeholder="New Password" />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
