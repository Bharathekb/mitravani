import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import LeftNav from "../components/leftnav";
import ChatBox from "../components/chatbox";
import Users from "../components/Users";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If there's no token, redirect to login page
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5001/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Set user data if request is successful
          setLoading(false); // Set loading to false after data is loaded
        })
        .catch((error) => {
          setLoading(false); // Set loading to false even if there's an error
          console.error("Error:", error.response?.data || error.message);
          if (error.response?.status === 401) {
            setError("Your session has expired. Please log in again.");
            // Remove expired token and redirect to login page
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError("Failed to load user data. Please try again later.");
          }
        });
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading user data...</p>
        {/* You can replace this with a spinner for a better user experience */}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={user} />
      <div className="main-layout">
        <LeftNav user={user} /> {/* Pass user object as prop to LeftNav */}
        <div className="dashboard-content d-flex">
          {error && (
            <div className="alert alert-danger">
              {error} {/* Improved error message display */}
            </div>
          )}
          <Users />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
