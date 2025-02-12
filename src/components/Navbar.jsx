import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import logo from '../assets/image/assignment-buddy.webp';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown বন্ধ করার জন্য outside click detect করা
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-green-500 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          <img src={logo} alt="SmartAssign Logo" className="h-10" />
        </Link>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink>
          <NavLink to="/assignments" className="text-white hover:text-gray-300">Assignments</NavLink>
          <NavLink to="/contact" className="text-white hover:text-gray-300">Contact</NavLink>
          {user && (
            <NavLink to="/pendingAssignments" className="text-white hover:text-gray-300">
              Pending Assignments
            </NavLink>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-white">
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="relative dropdown-container">
              {/* Avatar button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-white"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-green-500 dark:bg-gray-900 text-white shadow-lg rounded-lg p-2">
                  <Link to="/createAssignments" className="block px-4 py-2 hover:bg-green-600 rounded">
                    Create Assignments
                  </Link>
                  <Link to="/attemptAssignments" className="block px-4 py-2 hover:bg-green-600 rounded">
                    My Attempted Assignments
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="text-white hover:text-gray-300">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
