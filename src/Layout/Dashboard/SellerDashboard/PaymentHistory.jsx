import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totalPaid, setTotalPaid] = useState(0); // State to hold total paid amount

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: 'payments',
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching payment data");
    }
  }, [error]);

  useEffect(() => {
    // Calculate total paid amount when payments data changes
    if (payments.length > 0) {
      const totalAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalPaid(totalAmount);
    }
  }, [payments]);

  if (isLoading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Your Payments</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">User Email</th>
            <th className="py-2 px-4 border border-gray-300">Transaction ID</th>
            <th className="py-2 px-4 border border-gray-300">Amount</th>
            <th className="py-2 px-4 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentIntentId}>
              <td className="py-2 px-4 border border-gray-300">{payment.email}</td>
              <td className="py-2 px-4 border border-gray-300">{payment.paymentIntentId}</td>
              <td className="py-2 px-4 border border-gray-300">{payment.amount}$</td>
              <td className="py-2 px-4 border border-gray-300">{payment.status}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className="py-2 px-4 border border-gray-300 font-semibold text-right">Total Paid:</td>
            <td className="py-2 px-4 border border-gray-300 font-semibold">{totalPaid}$</td>
            <td className="py-2 px-4 border border-gray-300"></td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default PaymentHistory;
