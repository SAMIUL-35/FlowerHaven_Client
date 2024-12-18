import React from 'react';

const Banner = () => {
    return (
        <div 
            className="relative flex items-center justify-center h-[400px] md:h-[500px] bg-cover bg-center text-white" 
            style={{ backgroundImage: "url('../../public/f4.webp')" }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center px-6 md:px-12">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-shadow-lg">
                    Welcome to Our Website
                </h1>
                <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
                    Discover the best products and services curated just for you. 
                    Explore, shop, and enjoy an exceptional experience!
                </p>
                <a href="#explore" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition duration-300">
                    Start Exploring
                </a>
            </div>
        </div>
    );
};

export default Banner;
