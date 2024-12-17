import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FlowerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { username, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/flower/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch flower details.");
        }
        const data = await response.json();
        setFlower(data);
      } catch (error) {
        setMessage("Error fetching flower details. Please try again later.");
      }
    };
    fetchFlowerDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      setMessage("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    if (!flower || !flower.id) return;

    setLoading(true);
    setMessage("");

    const payload = {
      flower: flower.id,
      quantity: 1,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      setMessage("Item added to cart successfully!");
    } catch (error) {
      setMessage(error.response?.data?.detail || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!flower) {
    return <div>Loading flower details...</div>;
  }

  const { name, description, price, image, stock } = flower;

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img src={image} alt={name} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
          <p className="text-lg font-semibold">Price: ${price}</p>
          <p className="text-sm text-gray-500">Stock: {stock}</p>
          {username && (
            <p className="text-sm text-gray-500">Logged in as: {username}</p>
          )}
          <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={handleAddToCart}
            disabled={loading || stock === 0}
          >
            {loading ? "Adding..." : stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
          {message && (
            <p
              className={`mt-4 ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowerDetail;
