import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../providers/ThemeProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext); // Assuming `isDarkMode` is provided by ThemeContext
  
  return (
    <section className="w-full">
      <div className="navbar dark:bg-gray-800 dark:text-white bg-base-100 lg:px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/assignments">Assignments</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/pendingAssignments">Pending Assignments</NavLink>
                </li>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">AssignmentBuddy</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/pendingAssignments">Pending Assignments</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end">
          {!user && (
            <NavLink to="/login">
              <button className="btn btn-ghost">Login</button>
            </NavLink>
          )}

          {user && (
            <>
              <div className="flex justify-center items-center gap-2">
                <button onClick={logoutUser} className="btn">
                  Logout
                </button>
                {/* Image dropdown */}
                <div className="dropdown dark:bg-gray-900 dropdown-end z-50">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn bg-none btn-ghost btn-circle avatar"
                  >
                    <div
                      data-tooltip-id="my-tooltip"
                      className="w-10 bg-none rounded-full"
                    >
                      <img 
                        referrerPolicy="no-referrer"
                        alt="User Profile Photo"
                        src={user?.photoURL}
                      />
                      <Tooltip id="my-tooltip">
                        <div className="dark:text-white">
                          {user?.displayName}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow dark:bg-gray-900 rounded-box w-52"
                  >
                    {user && (
                      <li className="text-black dark:bg-gray-900 dark:text-white">
                        <Link to="/createAssignments">Create Assignments</Link>
                      </li>
                    )}
                    {user && (
                      <li className="text-black dark:bg-gray-900 dark:text-white">
                        <Link to="/attemptAssignments">
                          My Attempted Assignments
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn">
          <input
            type="checkbox"
            className="toggle"
            checked={isDarkMode} // Assuming isDarkMode from ThemeContext
            onChange={toggleTheme}
          />
        </button>
      </div>
    </section>
  );
};

export default Navbar;
