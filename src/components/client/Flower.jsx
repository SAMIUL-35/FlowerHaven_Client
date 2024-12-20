import React from 'react';
import { Link } from 'react-router-dom';

const Flower = ({ flower, categories }) => {
    const { id, name, price, image, stock, category } = flower;

    // Find category name from the categories array
    const categoryName = categories.find(cat => cat.id === category)?.name || 'Unknown';

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto transform transition-transform hover:scale-105">
            {/* Flower Image */}
            <figure className="relative w-full h-48">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full"
                  
                    onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
                />
                {/* Stock Status */}
                <span
                    className={`absolute top-2 right-2 py-1 px-2 rounded text-xs font-bold ${
                        stock > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                >
                    {stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </figure>

            {/* Flower Details */}
            <div className="p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600 mt-2">
                    <span className="font-medium text-gray-700">Category:</span>{' '}
                    <span className="text-gray-900">{categoryName}</span>
                </p>
                <p className="text-gray-800 font-bold mt-2">Price: ${price}</p>
                <p className="text-sm text-gray-500">
                    {stock > 0 ? `Available: ${stock}` : 'Currently Unavailable'}
                </p>

                {/* Action Button */}
                <div className="mt-4 flex justify-end">
                    <Link to={`/flower/${id}`}>
                        <button
                            className={`px-4 py-2 text-sm font-semibold rounded transition-all duration-300 ${
                                stock > 0
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-400 text-white cursor-not-allowed'
                            }`}
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
