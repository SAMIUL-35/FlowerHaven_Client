import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
const { token, username, setToken, setUser } = useContext(AuthContext);
  
  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform sign-out actions
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        // Redirect to home page
        navigate("/");
        Swal.fire("Signed Out", "You have been signed out successfully.", "success");
      }
    });
  };

  return (
    <div className="navbar bg-slate-500 text-white shadow-md">
      <div className="navbar-start">
        {/* Hamburger Menu for small screens */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-700 rounded-box w-52"
          >
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400 font-semibold" : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/flowers"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400 font-semibold" : ""
                }
              >
                Flowers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/OrderManagement"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400 font-semibold" : ""
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="text-red-200 hover:text-red-400 font-semibold"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
        {/* Title */}
        <h1 className="text-2xl font-bold ml-2">Admin Dashboard</h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/flowers"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : ""
              }
            >
              Flowers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/OrderManagement"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : ""
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="text-red-200 hover:text-red-400 font-semibold"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={handleBackToHome}
          className="btn btn-primary text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Navbar;
