import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Assuming you have AuthContext to manage authentication state

const Order = () => {
  const [orders, setOrders] = useState([]);  // Store fetched orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);  // Get the user's token from the AuthContext

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
        setOrders(data);  // Set the fetched orders to state
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
    return <div>Loading orders...</div>;  // Show loading indicator while fetching data
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;  // Show error message if fetching fails
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl mb-5">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>  // If no orders exist, show this message
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-5 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p>Status: {order.status}</p>
                  <p>Total Price: ${order.total_price}</p>
                </div>
                <div>
                  <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                  {/* You can format the created_at field to a readable date */}
                </div>
              </div>

              {/* You can also map through the order items if necessary */}
              <div className="mt-3">
                <h4 className="font-semibold">Items</h4>
                <ul>
                  {order.cart_items.map((item) => (
                    <li key={item.id} className="border-t py-2">
                      <p>{item.flower_name} - Quantity: {item.quantity}</p>
                      <p>Price: ${item.flower_price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Order;
