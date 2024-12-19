import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username, email, userType } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/signin';
      return;
    }

    // Fetch the user's orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/order/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Error fetching orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const grandTotal = orders.reduce((total, order) => {
    return total + parseFloat(order.total_price);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left section: Profile */}
        <div className="w-1/3 p-5 mt-16">
          <div className="card w-full bg-slate-600 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">Profile Information</h2>
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>User Type:</strong> {userType}</p>
            </div>
          </div>
        </div>

        {/* Right section: Orders */}
        <div className="w-2/3 p-5">
          <h2 className="text-3xl mb-5 font-bold">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full !bg-blue-100">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Flower Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) =>
                    order.cart_items.map((item) => (
                      <tr key={item.id}>
                        <td>{order.id}</td>
                        <td>{item.flower_name}</td>
                        <td>{item.quantity}</td>
                        <td>BDT {item.flower_price}</td>
                        <td>BDT {item.total_price}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
