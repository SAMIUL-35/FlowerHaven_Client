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
  
    // Prepare the registration data
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
  
      console.log(response);  // Log the response object to inspect its status
  
      if (response.ok) {
        alert('Registration Successful. Please check your email for confirmation.');
        navigate('/signin'); // Redirect to login page after successful registration
      } else {
        const data = await response.json();
        console.log(data);  // Log the response data (error message)
        setError(data.detail || 'Error during registration!');
      }
    } catch (err) {
      console.error(err);  // Log any error that occurs during the request
      setError('Network error or server is not responding!');
    }
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password1" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password1"
              className="input input-bordered w-full"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className="input input-bordered w-full"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-3">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700">
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