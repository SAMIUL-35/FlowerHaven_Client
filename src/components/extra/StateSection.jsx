import React from "react";

const StatsSection = () => {
  return (
    <div className="mb-20">
      {/* Unique Heading for the Stats Section */}
      <h2 className="text-4xl font-bold text-center mt-8 text-gray-800">
        Our Achievements
      </h2>

      <div
        className="w-full h-[400px] max-w-[1050px] m-12 relative"
        style={{
          backgroundImage: "url('/assets/banner6.jpg')", // Image from public/assets
          backgroundPosition: "center",
        }}
      >
        {/* Light-to-Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-gray-800 opacity-60"></div>
        
        {/* Stats Content */}
        <div className="flex justify-center items-center h-full text-slate-900 font-bold text-lg md:text-3xl relative z-10">
          <div className="flex flex-wrap justify-center w-full px-8 md:px-16 text-dark gap-8">
            <div className="text-center flex-1">
              <p className="text-4xl">85</p>
              <p>Blog Posts</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-4xl">25</p>
              <p>Happy Clients</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-4xl">85</p>
              <p>Artworks</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-4xl">Web Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
