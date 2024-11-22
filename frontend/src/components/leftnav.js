import React from "react";
import { Link } from "react-router-dom";

const LeftNav = ({ user }) => {
  return (
    <aside className="left-nav">
      <ul>
      <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/dashboard">Messages</Link></li>

        <li><Link to="/settings">Settings</Link></li>
        {/* Add more navigation links */}
      </ul>
    </aside>
  );
};

export default LeftNav;
