import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/style.css"; // Ensure the updated CSS is imported

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = () => {
      fetch("http://127.0.0.1:8000/api/cart/", {
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
          setCartItems(data);
        })
        .catch((error) => {
          setMessage("Error fetching cart items. Please try again later.");
          toast.error(error.message || "Error fetching cart items.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCartItems();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
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
    navigate("/checkout");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const grandTotal = calculateTotalPrice();

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-800">Your cart is empty!</p>
          <button className="btn btn-primary mt-4" onClick={handleBackToHome}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg mb-6 bg-white shadow-lg">
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
                        className="btn btn-error btn-sm"
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

          <div className="flex justify-between items-center mt-6 bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold text-lg text-gray-900">Grand Total: ${grandTotal}</p>
            <div className="flex space-x-4">
              <button className="btn btn-secondary" onClick={handleBackToHome}>
                Continue Shopping
              </button>
              <button className="btn btn-success" onClick={handleProceedToCheckout}>
                Proceed to Check Out
              </button>
            </div>
          </div>
        </>
      )}

      {message && (
        <div className={`mt-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Cart;
