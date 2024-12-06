import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.username) {
      isValid = false;
      newErrors.username = "Username is required.";
    }

    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required.";
    }

    if (!formData.confirmpassword) {
      isValid = false;
      newErrors.confirmpassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmpassword) {
      isValid = false;
      newErrors.confirmpassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5001/register",
          formData
        );
        setSuccessMessage(response.data);
        setErrorMessage("");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Error registering user. Please try again.");
        }
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Form contains errors.");
    }
  };

  return (
    <div className="container">
      <div className="Form-box mt-4 bg-white">
        <h1 className="Heading text-center mb-4">Register</h1>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="form-group mb-4">
            <label className="My-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="error-msg text-danger">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group mb-4">
            <label className="My-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-msg text-danger">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group mb-4">
            <label className="My-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="error-msg text-danger">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-4">
            <label className="My-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmpassword ? "is-invalid" : ""}`}
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
            />
            {errors.confirmpassword && (
              <p className="error-msg text-danger">{errors.confirmpassword}</p>
            )}
          </div>

          {/* Account Link */}
          <div className="mb-4 d-flex justify-content-between Account-box">
            <p className="Para fw-600">Already have an account? </p>
            <Link className="Link fw-600" to="/login">
              Login
            </Link>
          </div>

          {/* Submit Button */}
          <div className="w-100">
            <button type="submit" className="btn Submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
