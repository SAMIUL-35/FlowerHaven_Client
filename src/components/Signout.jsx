// src/components/SignOut.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const { setUser, setToken } = useContext(AuthContext); // Get setUsername and setToken from context
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear auth data in context
    setToken(null);
    setUser(null);

    // Clear auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to home or login page
    navigate('/');
  };

  return (
    <div className="signout-container">
      <button onClick={handleSignOut} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
