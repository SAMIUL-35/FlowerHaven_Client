import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="/assets/blog5.jpg" // Replace with your image path
              alt="About Us"
              className="rounded-lg shadow-lg object-cover w-full h-96"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              At <span className="font-semibold text-blue-600">Blossom & Bloom</span>, we believe flowers are more than just plants; they’re a way of spreading love, joy, and serenity. From breathtaking bouquets to enchanting floral arrangements, our passion is crafting beautiful moments that last a lifetime.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              With over <span className="font-semibold text-blue-600">10 years of experience</span>, we’ve been the trusted choice for weddings, special occasions, and everyday gestures of affection. Our team is dedicated to sourcing the freshest blooms and creating designs that speak the language of your heart.
            </p>
            <p className="text-lg text-gray-600">
              Join us in celebrating the timeless elegance of flowers. Let us help you turn your moments into cherished memories, one petal at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
