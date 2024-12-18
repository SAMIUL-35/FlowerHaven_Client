import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error('Token is missing');
        return; // Exit early or redirect the user to the login page
      }

      setIsLoading(true); // Show loading indicator
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/order/?page=${currentPage}`, {
          method: "GET",
          headers: {
            "Authorization": `Token ${token}`, // Include the token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data || []);
        console.log(data);
        if (data.count) {
          setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
        } else {
          setTotalPages(1); // Fallback to 1 page if count is missing
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    fetchOrders();
  }, [currentPage, token]); // Adding token to dependencies ensures the token is used in the request

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeStatus = async (orderId) => {
    try {
      // Find the order that is being updated
      const orderToUpdate = orders.find(order => order.id === orderId);

      if (orderToUpdate && orderToUpdate.status === "pending") {
        // Send a request to the server to change the order's status
        const response = await fetch(`http://127.0.0.1:8000/api/order/${orderId}/`, {
          method: "PATCH", // Assuming PATCH method for partial updates
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "completed" }), // Update status to completed
        });

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Update local state by modifying the status of the order
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order
        );
        setOrders(updatedOrders);
      } else {
        console.log("Order status is not pending, cannot change to completed.");
      }
    } catch (err) {
      console.error("Error changing status:", err);
    }
  };

  return (
    <div className="p-8">
      

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.username}</td>
                  <td className="border border-gray-300 px-4 py-2">${parseFloat(order.total_price).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paymentId ? order.paymentId : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleChangeStatus(order.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      disabled={order.status !== "pending"}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;
