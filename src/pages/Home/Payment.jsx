// src/pages/CheckoutPage.js
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import { Helmet } from 'react-helmet-async';

// Replace 'your-publishable-key-here' with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_51PNgLNRtOcwhWUJ1vhWIQrCfw5cldzBI1qCGNlBHWyXOf5mgrVxenKg8aA9hTtiRlWfBonIKkpcA7PwJl6bPfOVv00SqBwqllD");

const CheckoutPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
    setCartItems(storedCart);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <Helmet>
        <title>Medi-Shop | Payment</title>
       
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} navigate={navigate} cartItems={cartItems} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
