import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../extra/Footer"; 
import Navbar from './Navbar';

const AdminDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto mt-6 bg-lime-300200 text-gray-800">
      <Navbar/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;
