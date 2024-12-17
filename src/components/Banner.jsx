import React from 'react';

const Banner = () => {
    return (
        <div 
            className="relative flex items-center justify-center h-[400px] md:h-[500px] bg-cover bg-center text-white" 
            style={{ backgroundImage: "url('../../public/f4.webp')" }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Our Website
                </h1>
                <p className="text-lg md:text-xl">
                    Discover the best products and services curated just for you. 
                    Explore, shop, and enjoy an exceptional experience!
                </p>
            </div>
        </div>
    );
};

export default Banner;
