import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState(null);  // State to hold the payment URL
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // If no token, redirect to sign-in page
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchCartItems = () => {
      fetch('http://127.0.0.1:8000/api/cart/cart-total/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data.cart_items || []); // Set the fetched cart items
          setTotalPrice(data.grand_total || 0); // Set the grand total
        })
        .catch((error) => {
          setError('Error fetching cart data');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCartItems();
  }, [token, navigate]);

  const handlePayment = () => {
    // Initiate the order creation and payment session with the backend
    fetch('http://127.0.0.1:8000/api/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        // You can pass more details here if needed, like cart items or user details
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create payment session');
        }
        return response.json();
      })
      .then((data) => {
        // After receiving the response from the backend, redirect to the payment URL
        if (data.redirect_url) {
          setPaymentUrl(data.redirect_url);
          window.location.href = data.redirect_url; // Redirect user to the payment page
        } else {
          throw new Error('Payment session creation failed');
        }
      })
      .catch((error) => {
        setError('Error initiating payment');
        console.error(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally, display a loading spinner here
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl mb-5">Checkout</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <div className="mb-5">
        <h3 className="text-2xl">Cart Items</h3>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id} className="mb-4 p-4 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{item.flower_name}</h4>
                    <p>Price: ${item.flower_price}</p>
                  </div>
                  <div>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${item.flower_price * item.quantity}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No items in your cart.</p>
          )}
        </ul>
      </div>

      <div className="flex justify-between mb-5">
        <h3 className="text-xl">Total Price</h3>
        <p className="text-lg font-semibold">${totalPrice}</p>
      </div>

      <button
        className="btn btn-primary w-full py-2"
        onClick={handlePayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
