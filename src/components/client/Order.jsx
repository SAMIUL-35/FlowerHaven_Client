import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Assuming you have AuthContext to manage authentication state

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userName } = useContext(AuthContext);
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
            'Authorization': `Token ${token}`,  // Include the token in the headers for authentication
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);  
        console.log(data);
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
    return <div className="text-center">Loading orders...</div>;  // Show loading indicator while fetching data
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;  // Show error message if fetching fails
  }

  // Calculate the grand total from all orders
  const grandTotal = orders.reduce((total, order) => {
    return total + parseFloat(order.total_price);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto mt-10 flex flex-col min-h-screen">
      <h2 className="text-3xl mb-5 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>  // If no orders exist, show this message
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="bg-primary text-white">Order ID</th>
                <th className="bg-primary text-white">Flower Name</th>
                <th className="bg-primary text-white">Quantity</th>
                <th className="bg-primary text-white">Price</th>
                <th className="bg-primary text-white">Total Price</th>
                <th className="bg-primary text-white">Status</th> {/* New status column */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                order.cart_items.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{order.id}</td>
                    <td className="text-center">{item.flower_name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">BDT {item.flower_price}</td>
                    <td className="text-center">BDT {item.total_price}</td>
                    <td className="text-center">{order.status}</td> {/* Display status */}
                  </tr>
                ))
              ))}
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="mt-5 text-right">
            <h3 className="text-2xl font-semibold">Grand Total: BDT {grandTotal.toFixed(2)}</h3>
          </div>
        </div>
      )}

      {/* Footer (always at the bottom) */}
      <footer className="mt-auto bg-gray-800 text-white py-4">
        <div className="text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Order;
