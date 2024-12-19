import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderSuccessPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();  // To get the query parameters from the URL

  useEffect(() => {
    const params = new URLSearchParams(search);
    const tranId = params.get('tran_id');
    const userId = params.get('user_id');

    if (tranId && userId) {
      // Make the API request to confirm the payment
      const confirmPayment = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/order/payment-success/`, {
            params: { tran_id: tranId, user_id: userId },
          });
          setMessage('Payment Successful! Your order has been completed.');
        } catch (error) {
          setMessage('Payment validation failed or order already completed.');
        } finally {
          setIsLoading(false);
        }
      };

      confirmPayment();
    } else {
      setMessage('Invalid payment response.');
      setIsLoading(false);
    }
  }, [search]);

  return (
    <div>
      <h1>Payment Status</h1>
      {isLoading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
};

export default OrderSuccessPage;
