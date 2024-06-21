import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]); // Ensure the initial state is an array

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error fetching the payments.',
          icon: 'error',
        });
      }
    };

    fetchPayments();
  }, []);

  const handleAcceptPayment = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/payments/${id}`, { status: 'paid' });
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === id ? { ...payment, status: 'paid' } : payment
        )
      );
      Swal.fire({
        title: 'Payment Accepted',
        text: 'The payment status has been updated to paid.',
        icon: 'success',
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Unauthorized',
          text: 'You are not authorized to perform this action.',
          icon: 'error',
        });
      } else if (error.response && error.response.status === 403) {
        Swal.fire({
          title: 'Forbidden',
          text: 'You do not have the necessary permissions.',
          icon: 'error',
        });
      } else {
        console.error('Error updating payment status:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the payment status.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">User Email</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment._id}>
                <td className="py-2 border">{payment.email}</td>
                <td className="py-2 border">${payment.amount.toFixed(2)}</td>
                <td className="py-2 border">{payment.status}</td>
                <td className="py-2 border">
                  {payment.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptPayment(payment._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Accept Payment
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;