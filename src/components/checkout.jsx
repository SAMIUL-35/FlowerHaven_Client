import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState(null);  // State to hold the payment URL
  const navigate = useNavigate();
  const { username, token } = useContext(AuthContext);  // Get the user's token from the AuthContext

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
          setCartItems(data.cart_items || []);
          setTotalPrice(data.grand_total || 0);
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
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl mb-5 text-center font-semibold">Checkout</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      {/* Table for cart items */}
      <div className="overflow-x-auto mb-5">
        <table className="table table-zebra w-full">
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
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold">Total Price</h3>
        <p className="text-lg font-semibold">BDT {totalPrice}</p>
      </div>

      {/* Proceed to Payment Button */}
      <div className="mt-5">
        <button
          className="btn btn-primary w-full py-2"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
