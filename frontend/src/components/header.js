import React from "react";

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from localStorage
    window.location.href = "/login";    // Redirect to login page
  };

  return (
    <header className="header d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <div className="logo">My App</div>
      <div className="user-dropdown">
        {user ? (
          <div className="dropdown">
            <button
              className="btn dropdown-btn dropdown-toggle d-flex justify-content-between align-items-center"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.username} {/* Display username in dropdown */}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </header>
  );
};

export default Header;
