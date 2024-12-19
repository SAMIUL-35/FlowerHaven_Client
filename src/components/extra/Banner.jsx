import React from 'react';

const Banner = () => {
    return (
        <div>
            {/* New Heading at the top of the banner */}
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                Flower Heaven
            </h1>

            <div className="relative m-12 flex flex-col md:flex-row items-center h-screen md:h-[500px] bg-gradient-to-r from-black to-sky-400 text-white">
                {/* Left Text Content Section */}
                <div className="flex flex-col md:w-1/2 px-6 md:px-12 z-10 relative">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-yellow-500">
                        **Bloom & Beautify** <br /> **Elegant Flowers Await**
                    </h1>
                    <p className="text-base md:text-lg font-medium leading-relaxed mb-8 max-w-3xl">
                        Discover our exquisite floral designs to enhance your space. 
                        "Where flowers bloom, so does hope." - Lady Bird Johnson
                    </p>
                    <a href="#explore" className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300">
                        Explore Our Flowers
                    </a>
                </div>

                {/* Right Image Section */}
                <div className="md:w-1/2 h-full bg-cover bg-center opacity-70 relative">
                    <img src="/assets/banner.jpg" alt="Beautiful Flowers" className="object-cover w-full h-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
