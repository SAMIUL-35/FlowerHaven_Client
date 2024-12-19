import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const FlowerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFlowerLoading, setFlowerLoading] = useState(true);
  const { username } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const { categoryname } = useContext(CartContext);

  // Fetch flower details
  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        const response = await fetch(`https://flowerheaven.onrender.com/api/flower/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch flower details.");
        }
        const data = await response.json();
        setFlower(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch flower details. Please try again later.", "error");
      } finally {
        setFlowerLoading(false);
      }
    };
    fetchFlowerDetails();
  }, [id]);

  const handleAddToCart = async (redirectToCart = false) => {
    if (!token) {
      Swal.fire("Unauthorized", "You need to log in to add items to the cart.", "warning");
      navigate("/signin");
      return;
    }

    if (!flower || !flower.id) return;

    setLoading(true);

    const payload = {
      flower: flower.id,
      quantity: 1,
      purchased: false,
    };

    try {
      const response = await fetch("https://flowerheaven.onrender.com/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (redirectToCart) {
        navigate("/cart");
      }
      if (response.ok) {
        Swal.fire("Success", "Item added to cart successfully!", "success");
        
      } 
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred.", "error");
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
    <div className="container mx-auto mt-20 min-h-screen px-4">
      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="card bg-base-100 shadow-xl w-full lg:w-1/2">
          <figure>
            <img
              src={image || "/static/default-image.jpg"}
              alt={name}
              className="object-cover h-96 w-full rounded-t-xl"
            />
          </figure>
        </div>

        {/* Content Section */}
        <div className="card bg-lime-100 shadow-xl w-full lg:w-1/2 border-2 border-gray-300 rounded-xl">
          <div className="card-body text-gray-800 space-y-4 p-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-green-700">
              {name}
              {stock > 0 ? (
                <span className="badge badge-secondary ml-4 text-sm">In Stock</span>
              ) : (
                <span className="badge badge-error ml-4 text-sm">Out of Stock</span>
              )}
            </h2>

            {/* Category */}
            <p className="text-lg font-semibold">
              <span className="font-bold text-gray-700">Category:</span> {categoryname}
            </p>

            {/* Price */}
            <p className="text-lg font-semibold">
              <span className="font-bold text-gray-700">Price:</span> ${price}
            </p>

            {/* Description */}
            <p className="text-lg font-semibold">
              <span className="font-bold text-gray-700">Description:</span> {description}
            </p>

            {/* Stock */}
            <p className="text-sm font-semibold">
              <span className="font-bold text-gray-700">Stock:</span>{" "}
              {stock > 0 ? stock : "Unavailable"}
            </p>

            {/* Buttons */}
            <div className="card-actions flex flex-col sm:flex-row gap-4 mt-6 justify-center">
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
              <button className="btn btn-primary" onClick={handleBackToHome}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerDetail;
