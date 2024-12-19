import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FlowerManagement = () => {
  const [flowers, setFlowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://flowerheaven.onrender.com/api/flower/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setFlowers(data.results || []);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      })
      .catch((err) => console.error("Error fetching flowers:", err));
  }, [currentPage]);

  const handleDelete = (id) => {
    fetch(`https://flowerheaven.onrender.com/api/flower/${id}/`, {
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="p-8 flex-grow">
        <div className="space-y-4">
          <Link
            to="/admin/flowers/add"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full text-center transition duration-300"
          >
            Add Flower
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Flower Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flowers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No flowers found.
                  </td>
                </tr>
              ) : (
                flowers.map((flower) => (
                  <tr key={flower.id} className="hover:bg-gray-100 transition duration-300">
                    <td className="border border-gray-300 px-4 py-2">{flower.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{flower.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{flower.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{flower.stock}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(flower.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
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

        <div className="mt-6 flex justify-between items-center">
          <div>
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="ml-4 p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default FlowerManagement;
