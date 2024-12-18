import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col bg-gray-100 p-6">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold text-gray-800">Welcome to the Admin Dashboard</h1>
          <p className="text-xl mt-2 text-gray-600">Manage orders, products, and site settings from here.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Orders */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-700">Total Orders</h3>
            <p className="text-lg text-gray-500 mt-2">125</p>
          </div>

          {/* Card 2: Products */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-700">Products</h3>
            <p className="text-lg text-gray-500 mt-2">320</p>
          </div>

          {/* Card 3: Customers */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-700">Customers</h3>
            <p className="text-lg text-gray-500 mt-2">580</p>
          </div>

        </div>

        {/* Footer Section */}
        
        
      </div>
    </div>
  );
};

export default AdminDashboard;
