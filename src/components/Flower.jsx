import React from 'react';
import { Link } from 'react-router-dom';

const Flower = ({ flower }) => {
    const { id, name, description, price, image, stock } = flower;
 
    return (
        <div className="card glass w-96">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="object-cover h-48 w-full"
                />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p className="text-lg font-semibold">Price: ${price}</p>
                <p className="text-sm text-gray-500">Stock: {stock}</p>
                <div className="card-actions justify-end">
                    <Link to={`/flower/${id}`}>
                        <button className="btn btn-primary">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Flower;