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
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleForgotPassword}
        className="card bg-base-100 w-full max-w-sm shadow-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
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
