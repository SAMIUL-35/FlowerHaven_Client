import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.results || []);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <Link
          to="/admin/orders/view-all"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center"
        >
          View All Orders
        </Link>
        <Link
          to="/admin/orders/add"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-center"
        >
          Add Order
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${order.total_price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paymentId ? order.paymentId : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Details
                    </Link>
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
