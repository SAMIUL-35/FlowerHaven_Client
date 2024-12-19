import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import '../css/style.css'; 

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Get the user's token from the AuthContext

  useEffect(() => {
    // If no token, redirect to sign-in page
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchCartItems = () => {
      fetch('https://flowerheaven.onrender.com/api/cart/cart-total/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data.cart_items || []);
          setTotalPrice(data.grand_total || 0);
        })
        .catch(() => {
          setError('Error fetching cart data');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCartItems();
  }, [token, navigate]);

  const handleOrder = () => {
    // Place an order without payment
    fetch('https://flowerheaven.onrender.com/api/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire({
          title: 'Order Successful!',
          text: 'Your order has been placed successfully.',
          icon: 'success',
          confirmButtonText: 'Go to Profile',
        }).then(() => {
          navigate('/profile'); // Redirect to profile page after confirmation
        });
      })
      .catch(() => {
        setError('Error placing order');
        // Swal.fire({
        //   title: 'Error!',
        //   text: 'Failed to place your order. Please try again.',
        //   icon: 'error',
        //   confirmButtonText: 'Close',
        // });
      });
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>; // Optionally, display a loading spinner here
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {error && <div className="checkout-error">{error}</div>}

      {/* Table for cart items */}
      <div className="overflow-x-auto mb-6">
        <table className="checkout-table">
          <thead>
            <tr>
              <th>Flower Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.flower_name}</td>
                  <td>BDT {item.flower_price}</td>
                  <td>{item.quantity}</td>
                  <td>BDT {item.flower_price * item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No items in your cart.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div className="total-price">
        <h3>Total Price</h3>
        <p>BDT {totalPrice}</p>
      </div>

      {/* Proceed to Order Button */}
      <div>
        <button className="payment-button" onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
