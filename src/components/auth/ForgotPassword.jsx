import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/password_reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send password reset email.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password reset email has been sent. Please check your inbox.',
        confirmButtonText: 'OK',
      });
      setEmail(''); // Clear the input field on success
    } catch (error) {
      setError(error.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleForgotPassword}
        className="card bg-white w-full max-w-sm shadow-lg rounded-lg p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Forgot Password
        </h2>
        {error && (
          <p className="text-sm mb-4 text-red-500 border border-red-200 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300 ${
              loading ? 'loading' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
