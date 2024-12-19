import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";

const Flower = ({ flower, categories }) => {
    const { id, name, price, image, stock, category } = flower;
    const { setCategoryName } = useContext(CartContext);

    // Find the category name from the categories array
    const categoryName = categories.find((cat) => cat.id === category)?.name || 'Unknown';

    // Use useEffect to update the category name after the component has rendered
    useEffect(() => {
        setCategoryName(categoryName);
    }, [categoryName, setCategoryName]); // Run effect only when categoryName changes

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto transition-transform transform hover:scale-105">
            <figure className="relative w-full h-48">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
                {stock > 0 ? (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
                        In Stock
                    </span>
                ) : (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                        Out of Stock
                    </span>
                )}
            </figure>
            <div className="p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                    {name}
                </h2>
                <p className="text-gray-600 mt-2">
                    <span className="font-medium text-gray-700">Category:</span>{' '}
                    <span className="text-gray-900">{categoryName}</span>
                </p>
                <p className="text-gray-800 font-bold mt-2">Price: ${price}</p>
                <p className="text-sm text-gray-500">
                    {stock > 0 ? `Available: ${stock}` : 'Currently Unavailable'}
                </p>
                <div className="mt-4 flex justify-end">
                    <Link to={`/flower/${id}`}>
                        <button
                            className={`btn ${
                                stock > 0
                                    ? 'btn-primary hover:bg-blue-600'
                                    : 'btn-disabled cursor-not-allowed bg-gray-400'
                            } px-4 py-2 text-sm font-semibold rounded`}
                            disabled={stock <= 0}
                        >
                            {stock > 0 ? 'Details' : 'Sold Out'}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Flower;
