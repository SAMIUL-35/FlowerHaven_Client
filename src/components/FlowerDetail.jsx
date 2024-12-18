import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";

const FlowerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFlowerLoading, setFlowerLoading] = useState(true); // Flower loading state
  const { username } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const { categoryname } = useContext(CartContext);

  // Fetch flower details
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
      } finally {
        setFlowerLoading(false);
      }
    };
    fetchFlowerDetails();
  }, [id]);

  const handleAddToCart = async (redirectToCart = false) => {
    if (!token) {
      setMessage("You need to log in to add items to the cart.");
      navigate("/signin");
      return;
    }

    if (!flower || !flower.id) return;

    setLoading(true);
    setMessage("");

    const payload = {
      flower: flower.id,
      quantity: 1,
      purchased: false,
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

      const responseData = await response.json();
      if (redirectToCart) {
        navigate("/cart");
      }
      if (response.ok) {
        setMessage("Item added to cart successfully!");
        
      } 
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isFlowerLoading) {
    return <div>Loading flower details...</div>;
  }

  if (!flower) {
    return <div>Flower not found.</div>;
  }

  const handleBackToHome = () => {
    navigate("/");
  };

  const { name, category, description, price, image, stock } = flower;

  return (
    <div className="container mx-auto mt-44 min-h-screen px-4">
      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="card bg-base-100 shadow-xl w-full lg:w-1/2">
          <figure>
            <img
              src={image || "/static/default-image.jpg"}
              alt={name}
              className="object-cover h-96 w-full"
            />
          </figure>
        </div>

        {/* Content Section */}
        <div className="card bg-lime-100 shadow-xl w-full h-96 lg:w-1/2">
          <div className="card-body text-gray-800">
            {/* Title */}
            <h2 className="card-title">
              {name}
              {stock > 0 ? (
                <div className="badge badge-secondary ml-2">In Stock</div>
              ) : (
                <div className="badge badge-error ml-2">Out of Stock</div>
              )}
            </h2>

            {/* Category */}
            <p className="text-lg font-semibold text-gray-600">
              <span className="font-semibold">Category:</span> {categoryname}
            </p>

            {/* Price */}
            <p className="text-lg font-semibold">Price: ${price}</p>

            {/* Description */}
            <p className="text-lg font-semibold mb-4">Description: {description}</p>

            {/* Stock */}
            <p className="text-sm font-semibold">
              Stock: {stock > 0 ? stock : "Unavailable"}
            </p>

            {/* Buttons */}
            <div className="card-actions flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                onClick={() => handleAddToCart(false)}
                disabled={loading || stock === 0}
              >
                {loading ? "Processing..." : stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                className="btn btn-primary bg-green-500"
                onClick={() => handleAddToCart(true)}
                disabled={loading || stock === 0}
              >
                Buy Now
              </button>
              <button className="btn btn-primary mr-2" onClick={handleBackToHome}>
                Continue Shopping
              </button>
            </div>

            {/* Message */}
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
    </div>
  );
};

export default FlowerDetail;
