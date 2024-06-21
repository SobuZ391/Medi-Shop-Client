import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  if (!state) {
    // Redirect to the shop page if no state is available
    navigate('/');
    return null;
  }

  const { paymentMethod, totalAmount } = state;
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div className="container mx-auto p-4">
      <div ref={invoiceRef} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <div className="text-center mb-6">
          <img src="/path-to-your-logo.png" alt="Website Logo" className="mx-auto w-24 h-24" />
          <h1 className="text-2xl font-bold">Invoice</h1>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Purchase Information</h2>
          <p><strong>Payment Method ID:</strong> {paymentMethod.id}</p>
          <p><strong>Card Brand:</strong> {paymentMethod.card.brand}</p>
          <p><strong>Last 4 Digits:</strong> {paymentMethod.card.last4}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button 
          onClick={handlePrint} 
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Print Invoice
        </button>
      </div>
    </div>
  );
}

export default Invoice;
