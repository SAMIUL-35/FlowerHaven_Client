import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaCartPlus, FaUser, FaSignOutAlt, FaMoon, FaRegMoon } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { token, username, isAdmin } = useContext(AuthContext);
  const { cartItems } = useCart();
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/blog">Blog</NavLink></li>
      <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
    </>
  );

  const authLinks = token ? (
    <>
      <li><NavLink to="/profile"><FaUser /></NavLink></li>
      {token?.isSeller && (
        <li><NavLink to="/seller/dashboard">Seller Dashboard</NavLink></li>
      )}
      
      <li><NavLink to="/signout">Sign Out</NavLink></li>
      <li><NavLink to="/order">Order History</NavLink></li>
    </>
  ) : (
    <>
      <li><NavLink to="/signin">Sign In</NavLink></li>
      <li><NavLink to="/signup">Registration</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-transparent">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-xl">
          FlowerHaven
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex items-center space-x-4">
        <ul className="menu menu-horizontal px-1">
          {authLinks}
        </ul>
        <NavLink to="/cart" className="flex items-center">
          <FaCartPlus />
          <span className="ml-2">Cart ({cartItems.length})</span>
        </NavLink>
        {/* <button onClick={toggleTheme} className="flex items-center" aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaRegMoon />}
        </button> */}
      </div>
    </div>
  );
};

export default Header;
