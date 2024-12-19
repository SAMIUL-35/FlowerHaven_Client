import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../extra/Header"; // You can create a specific admin header if needed
import Footer from "../extra/Footer"; // You can create a specific admin footer if needed

const AdminDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto mt-6 bg-lime-300200 text-gray-800">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;
