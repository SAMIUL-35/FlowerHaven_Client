import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState(null);



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      
      fetch('https://flowerheaven.onrender.com/api/user-profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${storedToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Profile Data:', data);
          setUser(data.username);
          setUserType(data.user_type);
          setEmail(data.email) 
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ username,email, userType, token, setUser, setUserType, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
