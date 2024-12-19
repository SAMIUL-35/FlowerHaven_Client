// Newsletter.js
import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full max-w-[1050px] ms-12 mt-15   bg-gradient-to-r from-black via-black-300 to-teal-100 ">
      {/* Container Heading between Image and Content */}
      <h2 className="text-4xl font-bold text-center mb-8 text-white">
        Stay in Touch with Our Floral Updates
      </h2>

      <div className="flex items-center gap-4">
        {/* Left Image Section */}
        <div
          className="w-1/2 h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/newsletter2.jpg')", // Flower background image from public/assets
          }}
        ></div>

        {/* Right Content Section */}
        <div className="w-1/2 h-[400px] flex flex-col justify-center px-8 text-center text-white bg-gradient-to-r from-teal-200 via-teal-500 to-teal-700">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Join Our Floral Community</h2>
          <p className="mb-6 text-lg text-gray-200">
            Sign up for our newsletter and be the first to know about new floral designs, special offers, and exclusive deals!
          </p>

          {/* Newsletter Form */}
          <div className="flex justify-center gap-4">
            <input
              type="email"
              className="p-3 rounded-lg text-black w-full max-w-xs"
              placeholder="Enter your email"
            />
            <button className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
