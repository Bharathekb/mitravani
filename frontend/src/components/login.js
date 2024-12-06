import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/login", formData);

      if (response.data && response.data.token) {
        const { token } = response.data;
        // Store JWT token in localStorage
        localStorage.setItem("token", token);
        navigate("/dashboard"); // Redirect to the dashboard page after login
      } else {
        setErrorMessage("Failed to login, please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data || "Internal Server Error");
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="Form-box mt-4 bg-white">
        <h1 className="Heading text-center mb-4">Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group mb-4">
            <label className="My-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="form-group mb-4">
            <label className="My-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Register Link */}
          <div className="mb-4 d-flex justify-content-between Account-box">
            <Link className="Link fw-600" to="/register">
              Register
            </Link>
          </div>

          {/* Submit Button */}
          <div className="w-100">
            <button type="submit" className="btn Submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
