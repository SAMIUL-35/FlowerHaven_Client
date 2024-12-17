import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-4">
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
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-semibold" : ""
              }
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signout"
              className={({ isActive }) =>
                isActive ? "text-red-400 font-semibold" : "text-red-200"
              }
            >
              Sign Out
            </NavLink>
          </li>
        </ul>
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
