import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password1 !== password2) {
      setError('Passwords do not match!');
      return;
    }
  
    const registrationData = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      console.log(response);  
  
      if (response.ok) {
        alert('Registration Successful. Please check your email for confirmation.');
        navigate('/signin');
      } else {
        const data = await response.json();
        console.log(data);
        setError(data.detail || 'Error during registration!');
      }
    } catch (err) {
      console.error(err);
      setError('Network error or server is not responding!');
    }
  };
  
  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center px-5"
      style={{ backgroundImage: "url('/src/assets/signup3.jpg')" }}
    >
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-0"></div> */}

      {/* Form Section */}
      <div className="relative z-10 bg-white/80 p-8 shadow-xl rounded-lg max-w-md w-full mx-auto backdrop-blur-sm">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Create Your Account</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password1" className="block text-lg font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password1"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password2" className="block text-lg font-semibold text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-blue-600 font-semibold underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
