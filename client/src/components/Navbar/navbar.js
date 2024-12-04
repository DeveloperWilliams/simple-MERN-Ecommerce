"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/app/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin from @react-oauth/google
import "./navbar.css";

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Handle regular form login
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
      })
      .catch((err) => {
        toast.error("Google Login Failed", err,{
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true, 
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // Handle logout
  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

//display the first name of the user only
  const user = localStorage.getItem("user");
  const userName = user ? user.split(" ")[1] : "";

  // Conditionally render login form or account menu
  const checkLogin = () => {
    if (!isLoggedIn) {
      return (
        <li>
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>Login</p>
          {/* Conditionally render the login form inside the li */}
          <div className="dropdownForm">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <div className="google-login">
                {/* Google Login Button */}
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) =>
                    console.log("Google Login Failed:", error)
                  }
                />
              </div>
              <Link href="/my-account">
                <p>Register</p>
              </Link>
            </form>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <FontAwesomeIcon className="icon" icon={faLock} />
          <p>Hello, {userName}</p> {/* Display the first name of the user */}
          <div className="dropdown">
            <ul>
              <li>Profile</li>
              <li>My Orders</li>
              <li onClick={logOut}>Log Out</li>
            </ul>
          </div>
        </li>
      );
    }
  };
  

  return (
    <>
      <div className="navbar">
        <div>
          <Link href="/">
            <Image
              src="/images/friskay.png"
              alt="logo"
              width={60}
              height={20}
            />
          </Link>
        </div>
        <div>
          <input type="text" placeholder="Search" aria-label="search" />
          <button>Search</button>
        </div>
        <div>
          <ul>
            {checkLogin()} {/* Render login or account dropdown */}
            <li>
              <p>My Cart</p>
              <FontAwesomeIcon className="icon" icon={faShoppingCart} />
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
