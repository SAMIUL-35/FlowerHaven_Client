import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "./context/CartContext";
const Flower = ({ flower, categories }) => {
    const { id, name, price, image, stock, category } = flower;
  const { categoryname,setCategoryName, } = useContext(CartContext);
    // Find the category name from the categories array
    const categoryName =
        categories.find((cat) => cat.id === category)?.name || 'Unknown';
        setCategoryName(categoryName);

    return (
        <div className="card bg-base-100 shadow-xl w-96">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="object-cover h-48 w-full"
                />
            </figure>
            <div className="card-body bg-lime-100 text-gray-800">
                <h2 className="card-title">
                    {name}
                    {stock > 0 ? (
                        <div className="badge badge-secondary ml-2">In Stock</div>
                    ) : (
                        <div className="badge badge-error ml-2">Out of Stock</div>
                    )}
                </h2>
                <p className="text-lg font-semibold text-gray-600">
                    <span className="font-semibold">Category:</span> {categoryName}
                </p>
                <p className="text-lg font-semibold">Price: ${price}</p>
                <p className="text-sm font-semibold">
                    Stock: {stock > 0 ? stock : 'Unavailable'}
                </p>
                <div className="card-actions justify-end">
                    <Link to={`/flower/${id}`}>
                        <button
                            className="btn btn-primary"
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
