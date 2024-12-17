import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FlowerManagement = () => {
  const [flowers, setFlowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/flower/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setFlowers(data.results || []);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      })
      .catch((err) => console.error("Error fetching flowers:", err));
  }, [currentPage]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/flower/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setFlowers(flowers.filter((flower) => flower.id !== id));
      })
      .catch((err) => console.error("Error deleting flower:", err));
  };

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
          to="/admin/flowers/view-all"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center"
        >
          View All Flowers
        </Link>
        <Link
          to="/admin/flowers/add"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-center"
        >
          Add Flower
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Flower Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flowers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No flowers found.
                </td>
              </tr>
            ) : (
              flowers.map((flower) => (
                <tr key={flower.id}>
                  <td className="border border-gray-300 px-4 py-2">{flower.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{flower.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{flower.stock}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(flower.created_at).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(flower.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
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

export default FlowerManagement;
