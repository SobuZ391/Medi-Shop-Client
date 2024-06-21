import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Simulate a payment process (Replace this with your server-side logic)
      console.log(paymentMethod);

      // Assuming the payment is successful
      navigate('/invoice', { state: { paymentMethod, totalAmount } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 mb-4" />
      <button type="submit" disabled={!stripe} className="bg-blue-500 text-white px-4 py-2 rounded">
        Pay ${totalAmount}
      </button>
    </form>
  );
}

export default CheckoutForm;
