import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaCartPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Header = () => {
  const { token, username, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
        Swal.fire("Signed Out", "You have been signed out successfully.", "success");
      }
    });
  };

  const guestLinks = (
    <>
      <li>
        <NavLink to="/signin" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          Registration
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/profile" className="text-lg font-medium text-gray-800 hover:text-gray-600 flex items-center">
          <FaUser className="mr-1" /> {username}
        </NavLink>
      </li>
      <li>
        <button
          onClick={handleSignOut}
          className="text-lg font-medium text-gray-800 hover:text-gray-600 flex items-center"
        >
          <FaSignOutAlt className="mr-1" /> Sign Out
        </button>
      </li>
    </>
  );

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/AboutUs" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contactus" className="text-lg font-medium text-gray-800 hover:text-gray-600">
          Contact Us
        </NavLink>
      </li>
      
        <li>
          <NavLink to="/admin/dashboard" className="text-lg font-medium text-gray-800 hover:text-gray-600">
            Admin Dashboard
          </NavLink>
        </li>
      
    </>
  );

  return (
    <div className="navbar bg-slate-400 py-4 px-6">
      <div className="navbar-start">
        {/* Brand Name */}
        <NavLink to="/" className="btn btn-ghost normal-case text-2xl text-gray-800 font-bold">
          FlowerHeaven
        </NavLink>

        {/* Hamburger Menu for Mobile */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52"
          >
            {navLinks}
            {token ? userLinks : guestLinks}
            <li>
              <NavLink to="/cart" className="flex items-center text-lg font-medium text-gray-800 hover:text-gray-600">
                <FaCartPlus className="mr-1" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4">{navLinks}</ul>
      </div>

      {/* User Actions */}
      <div className="navbar-end hidden lg:flex items-center space-x-6">
        <ul className="menu menu-horizontal px-1">{token ? userLinks : guestLinks}</ul>
        <NavLink to="/cart" className="flex items-center text-lg font-medium text-gray-800 hover:text-gray-600">
          <FaCartPlus className="mr-1" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
