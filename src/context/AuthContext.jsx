import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Set the token from localStorage
      // Corrected variable name to match the `localStorage` key
      const storedUsername = localStorage.getItem('username');
      setUser(storedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
