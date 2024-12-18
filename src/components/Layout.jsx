import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen max-w-6xl mx-auto bg-gray-300 text-white">
            <Header />
            {/* Main content dynamically adjusts its height */}
            <main className="flex-grow">
                <Outlet />
            </main>
            {/* Footer fixed at the bottom */}
            <Footer />
        </div>
    );
};

export default Layout;
