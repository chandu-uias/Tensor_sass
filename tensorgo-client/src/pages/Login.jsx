import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;


// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";
console.log("Server Domain:", axios.defaults.baseURL);

function Login() {
  
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formDetails;


    if (!email || !password) return toast.error("Email and password are required");
    if (!role) return toast.error("Please select a role");
    if (!["superadmin", "orgadmin", "user"].includes(role.toLowerCase())) return toast.error("Please select a valid role");
    if (password.length < 5) return toast.error("Password must be at least 5 characters long");

    try {
      const { data } = await toast.promise(
        axios.post("/login-user", { email, password, role }),
        {
          pending: "Logging in...",
          success: "Login successful",
          error: "Login failed",
        }
      );
      
     
       localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      console.log("Login Data:", JSON.stringify(data.user.name));


      const userRole = data.user.role.toLowerCase();
      if (userRole === "superadmin") navigate("/plans");
      else if (userRole === "orgadmin") navigate("/users");
      else navigate("/"); 
   
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <section className="login-section flex-center">
      <div className="login-container flex-center">
        <h2 className="form-heading">Sign In</h2>
        <form onSubmit={formSubmit} className="login-form">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
            required
          />
          <select
            name="role"
            className="form-input"
            value={formDetails.role}
            onChange={inputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="superadmin">SuperAdmin</option>
            <option value="orgadmin">OrgAdmin</option>
            <option value="user">User</option>
          </select>
          <button type="submit" className="btn form-btn">Sign In</button>
        </form>
        <NavLink className="login-link" to="/forgotpassword">Forgot Password?</NavLink>
        <p>Not a user? <NavLink className="login-link" to="/register">Register</NavLink></p>
      </div>
    </section>
  );
}

export default Login;
