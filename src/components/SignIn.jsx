import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, email, password };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);

      setToken(response.data.key);
      setUser(username);
      localStorage.setItem('token', response.data.key);
      localStorage.setItem('username', username);

      navigate('/');
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  const handleGoogleLogin = () => alert("Google login not implemented yet.");
  const handleFacebookLogin = () => alert("Facebook login not implemented yet.");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12"
      style={{
        backgroundImage: "url('/src/assets/signup3.jpg')",
        backgroundSize: "cover",
        paddingTop: "4rem", // Adjusted to avoid navbar coverage
      }}
    >
      {/* Gradient Overlay */}
      {/* <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"
        style={{
          top: "5rem", 
          bottom:"-7rem",
          left:"12rem",
          right:"12rem",
        }}
      ></div> */}

      {/* Sign-In Card */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign In</h2>
        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              aria-label="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              aria-label="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              aria-label="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/password_reset"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-center text-gray-500 text-sm bg-white px-4">
            OR
          </div>
        </div>

        {/* Social Login Buttons */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 border border-gray-300 rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition mb-3"
        >
          <img src="/src/assets/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full py-2 border border-gray-300 rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
        >
          <img src="/src/assets/facebook-icon.svg" alt="Facebook" className="h-5 w-5 mr-2" />
          Continue with Facebook
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
