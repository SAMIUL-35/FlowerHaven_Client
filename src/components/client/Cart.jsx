import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/style.css"; // Ensure the updated CSS is imported

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = () => {
      setLoading(true); // Set loading to true when starting fetch

      fetch("https://flowerheaven.onrender.com/api/cart/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch cart items.");
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data); // Successfully fetched cart items
        })
        .catch((error) => {
          toast.error("Error fetching cart items.");
        })
        .finally(() => {
          setLoading(false); // Ensure loading is set to false when fetch is complete
        });
    };

    fetchCartItems();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://flowerheaven.onrender.com/api/cart/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete item.");
      }

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error(error.message || "Error deleting item.");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.total_price, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate("/Checkout");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const grandTotal = calculateTotalPrice();

  return (
    <div className="min-h-screen flex flex-col p-8 bg-gray-50">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-700">Your cart is empty!</p>
          <button className="btn btn-primary mt-4 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={handleBackToHome}>
            Continue Shopping
          </button>
         
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg mb-6 bg-white shadow-lg border border-gray-200">
            <table className="table w-full table-auto border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Quantity</th>
                  <th className="border p-3">Price (unit)</th>
                  <th className="border p-3">Total Price</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-200 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border p-3">{item.flower_name}</td>
                    <td className="border p-3">{item.quantity}</td>
                    <td className="border p-3">${item.flower_price}</td>
                    <td className="border p-3">${item.total_price}</td>
                    <td className="border p-3">
                      <button
                        className="btn btn-error btn-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-all"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-8 bg-white p-6 shadow-md rounded-lg">
            <p className="font-bold text-xl text-gray-900">Grand Total: ${grandTotal}</p>
            <div className="flex space-x-6">
              <button className="btn btn-secondary px-6 py-3 bg-gray-600 text-white hover:bg-gray-700 rounded-md transition-all" onClick={handleBackToHome}>
                Continue Shopping
              </button>
              <button className="btn btn-success px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-md transition-all" onClick={handleProceedToCheckout}>
                Proceed to Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
