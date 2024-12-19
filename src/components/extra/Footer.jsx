import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-400 text-black py-8 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8  text-black">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">We are passionate about providing the freshest and most beautiful flowers for any occasion. Our goal is to make your life bloom!</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Home</a></li>
              <li><a href="/blog" className="text-sm hover:underline">Blog</a></li>
              <li><a href="/about" className="text-sm hover:underline">About Us</a></li>
              <li><a href="/contact" className="text-sm hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul>
              <li className="text-sm">123 Flower St, Garden City</li>
              <li className="text-sm">Email: info@flowershop.com</li>
              <li className="text-sm">Phone: (123) 456-7890</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-gray-400">Facebook</a>
              <a href="#" className="text-sm hover:text-gray-400">Instagram</a>
              <a href="#" className="text-sm hover:text-gray-400">Twitter</a>
              <a href="#" className="text-sm hover:text-gray-400">Pinterest</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">© 2024 FlowerHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
