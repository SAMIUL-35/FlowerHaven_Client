import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      email,
      password,
    };

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

  const handleGoogleLogin = () => {
    // Logic for Google login (depends on your backend implementation)
    alert("Google login not implemented yet.");
  };

  const handleFacebookLogin = () => {
    // Logic for Facebook login (depends on your backend implementation)
    alert("Facebook login not implemented yet.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center px-5"
      style={{ backgroundImage: "url('/src/assets/signup3.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-0"></div>

      {/* Form Section */}
      <div className="relative z-10 bg-sky-200 p-6 shadow-lg rounded-lg max-w-sm w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Sign In
        </h2>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-3">
            Sign In
          </button>
        </form>

        <div className="text-center mb-3">
          <Link
            to="/password_reset"
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <span className="bg-sky-200 px-2 text-gray-600 text-sm">OR</span>
          <div className="absolute inset-0 border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-primary w-full flex items-center justify-center mb-3"
        >
          <img
            src="/src/assets/google-icon.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="btn btn-outline btn-blue-600 w-full flex items-center justify-center"
        >
          <img
            src="/src/assets/facebook-icon.svg"
            alt="Facebook"
            className="w-5 h-5 mr-2"
          />
          Continue with Facebook
        </button>

        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;