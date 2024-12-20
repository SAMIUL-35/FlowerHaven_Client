import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match! Please try again.",
      });
      return;
    }

    const registrationData = {
      username,
      email,
      password1,
      password2,
    };

    try {
      const response = await fetch(
        "https://flowerheaven.onrender.com/api/auth/registration/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Please check your email for confirmation.",
        });
        navigate("/signin");
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.detail || "Error during registration! Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Network error or server is not responding! Please try later.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 relative bg-cover bg-center px-5"
      style={{ backgroundImage: "url('/assets/signup3.jpg')" }}
    >
      <div className="relative z-10 bg-white/80 p-8 shadow-xl rounded-lg max-w-md w-full mx-auto backdrop-blur-sm">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              aria-label="Username"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              aria-label="Email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password1"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password1"
              aria-label="Password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              aria-label="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Re-enter your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
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
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
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
