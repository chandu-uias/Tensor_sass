import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/register.css";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";

function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; 
    setLoading(true); 

    const { name, email, password, confpassword } = formDetails;

    if (!name || !email || !password || !confpassword || !selectedRole) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      setLoading(false);
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      setLoading(false);
      return;
    }

    if (password !== confpassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await toast.promise(
        axios.post("/register-user", {
          name,
          email,
          password,
          role: selectedRole,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
        }
      );

      setLoading(false); 
      navigate("/login"); 
    } catch (error) {
      console.error("Registration Error:", error);
      setLoading(false); 
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <select
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="form-input"
          >
            <option value="">Select Role</option>
            <option value="superadmin">SuperAdmin</option>
            <option value="orgadmin">OrgAdmin</option>
            <option value="user">User</option>
          </select>

          <button type="submit" className="btn form-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
