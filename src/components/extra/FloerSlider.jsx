import React from 'react';

const FlowerSlider = () => {
  return (
    <div className="mb-8 px-8">
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full relative">
          <img
            src="/assets/slider1.jpg" // Use /public if the image is inside public folder
            alt="Bloom and Beautify" // Add alt text for accessibility
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-extrabold">
            Bloom & Beautify
          </div>
        </div>
        <div id="item2" className="carousel-item w-full relative">
          <img
            src="/assets/slider2.jpg"
            alt="Elegant Flowers Await"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-extrabold">
            Elegant Flowers Await
          </div>
        </div>
        <div id="item3" className="carousel-item w-full relative">
          <img
            src="/assets/slider7.jpg"
            alt="Discover Our Floral Designs"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-extrabold">
            Discover Our Floral Designs
          </div>
        </div>
        <div id="item4" className="carousel-item w-full relative">
          <img
            src="/assets/slider5.jpg"
            alt="Where Flowers Bloom"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-extrabold">
            Where Flowers Bloom
          </div>
        </div>
      </div>

      {/* Added margin-bottom of 20 to this section */}
      <div className="flex w-full justify-center gap-2 py-2 mb-20">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
      </div>
    </div>
  );
};

export default FlowerSlider;
