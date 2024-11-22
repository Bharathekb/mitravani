import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    axios
      .get("http://localhost:5001/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authorization
        },
      })
      .then((response) => {
        setUsers(response.data); // Set the fetched users data
      })
      .catch((error) => {
        setError("Failed to load users");
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="users">
      <h2>Registered Users</h2>
      {error && <p className="error-msg">{error}</p>}
      <ul>
        {users.length === 0 ? (
          <li>No users found</li>
        ) : (
          users.map((user, index) => (
            <li key={index}>{user.username}</li> // Display each user's username
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
