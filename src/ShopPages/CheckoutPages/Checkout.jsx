import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-publishable-key-here');

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  
  if (!state) {
    // Redirect to the shop page if no state is available
    navigate('/');
    return null;
  }

  const totalAmount = state.totalAmount || 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
}

export default Checkout;
