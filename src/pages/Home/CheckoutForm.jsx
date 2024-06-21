// src/components/CheckoutForm.js
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth"; // Assuming you have a hook to get user data

const CheckoutForm = ({ totalAmount, navigate, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // Get the user information

  useEffect(() => {
    axios
      .post("https://y-plum-nine.vercel.app/create-payment-intent", {
        amount: totalAmount * 100, // amount in cents
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true); // Disable the button

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user.displayName, // Use the user's display name
        },
      },
    });
    
    if (error) {
      console.error("Payment error:", error);
      Swal.fire({
        title: "Payment Failed",
        text: error.message,
        icon: "error",
      });
      setIsLoading(false); // Ensure button is re-enabled on error
    } else if (paymentIntent.status === "succeeded" ) 
    {
      // Payment successful, send data to backend
      try {
        await axios.post("https://y-plum-nine.vercel.app/confirm-payment", {
          paymentIntentId: paymentIntent.id,
          amount: totalAmount,
          status: paymentIntent.status,
          email: user.email,
          mediName: cartItems.map(item => item.name).join(", "), // Combine medicine names
        });

        // Clear cart and navigate to invoice or success page
        localStorage.removeItem("cart");
        Swal.fire({
          title: "Payment Successful",
          text: `Thank you! Your payment of $${totalAmount.toFixed(2)} was successful.`,
          icon: "success",
        }).then(() => {
          navigate("/invoice", { state: { amount: totalAmount } });
        });
      } catch (err) {
        console.error("Error confirming payment:", err);
        Swal.fire({
          title: "Error",
          text: "There was an error saving the payment confirmation.",
          icon: "error",
        });
      } finally {
        setIsLoading(false); // Re-enable the button
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <div className="mb-4">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
      <div>
        <img
          className="border-2 rounded-lg m-2"
          src="https://img.freepik.com/free-photo/3d-payment-terminal-bank-card-blue-checkmark_107791-17014.jpg?w=826&t=st=1718786240~exp=1718786840~hmac=897866cae02784eaa3f2e4f3c22aead1bbccd256ef92772aa6456b608aeb69e7"
          alt="Payment Illustration"
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
