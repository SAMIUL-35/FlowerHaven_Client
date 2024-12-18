import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h2>
          <p className="text-lg mt-4">Manage orders, products, and site settings from here.</p>
        </div>
      </div>

      
    </div>
  );
};

export default AdminDashboard;
