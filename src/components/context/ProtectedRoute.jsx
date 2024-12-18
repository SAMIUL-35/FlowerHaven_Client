import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; 
import Header from '../Header';
import Footer from '../Footer';

const ProtectedRoute = ({ element, ...rest }) => {
  const { userType } = useContext(AuthContext);

  if (userType !== 'admin') {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center py-20">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
            <h1 className="text-3xl font-extrabold text-red-600 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-700 mb-6">
              Only admin users can access the Admin Dashboard. Please contact the administrator for access.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn btn-primary py-2 px-6 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Go Back to Home
            </button>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
