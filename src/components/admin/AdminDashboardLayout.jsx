import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Navbar"; // You can create a specific admin header if needed
import Footer from "../Footer"; // You can create a specific admin footer if needed

const AdminDashboardLayout = () => {
  return (
    <div className="max-w-6xl mx-auto bg-gray-200 text-gray-800">
    
      <Header />

     
      <Outlet />

      
      <Footer/>
    </div>
  );
};

export default AdminDashboardLayout;
