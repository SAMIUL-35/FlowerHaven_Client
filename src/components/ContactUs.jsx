import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
          Get in Touch
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          We'd love to hear from you! Whether you have questions or feedback, reach out to us, and we’ll respond promptly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <i className="fas fa-phone-alt text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-800">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <i className="fas fa-envelope text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-800">Email</h4>
                <p className="text-gray-600">info@flowershop.com</p>
              </div>
            </div>
            <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-800">Address</h4>
                <p className="text-gray-600">123 Blossom Street, Bloom City, FL</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <form className="bg-white p-8 rounded-lg shadow-xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered w-full px-4 py-2 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full px-4 py-2 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="textarea textarea-bordered w-full px-4 py-2 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="5"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg text-lg hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
