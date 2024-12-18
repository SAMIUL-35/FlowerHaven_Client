import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import { toast } from 'react-toastify'; // Import toast for error messages

const Profile = () => {
  const [user, setUser] = useState(null);  // Store user profile
  const [cartItems, setCartItems] = useState([]);  // Store cart items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username,email, userType, } = useContext(AuthContext);  // Get the user's token from the AuthContext
const token=localStorage.getItem('token');
 

  return (
    <div>
            <p>Name: {username}</p>
            <p>Email: {email}</p>
            <p>Email: {userType}</p>
            {/* Display other user details as necessary */}
          </div>
  )
};

export default Profile;
