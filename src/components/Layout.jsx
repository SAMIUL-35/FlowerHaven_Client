import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout = () => {
    return (
        <div className="max-w-6xl mx-auto bg-gray-300200 text-white">

            <Header></Header>
            
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;