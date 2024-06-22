import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UserHome from "../../Layout/Dashboard/UserHome";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching payment data");
    }
  }, [error]);

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">User Dashboard</h1>
      <div className="border-2 font-bold w-full md:w-96 p-2 rounded-xl bg-accent mx-auto md:mx-0"><UserHome /></div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-10">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <p className="flex flex-col"><strong>Full Name:</strong> <span className="lg:text-3xl text-xl font-medium italic" >{user.displayName}</span></p>
        <p className="lg:text-xl text-base"><strong>Email:</strong> {user.email}</p>
        {user.photoURL && <img src={user.photoURL} alt="Profile" className="rounded-full w-24 h-24 mt-4 mx-auto md:mx-0" />}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading payment history</p>
        ) : payments.length === 0 ? (
          <p>No payment history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300">Transaction ID</th>
                  <th className="py-2 px-4 border border-gray-300">Amount</th>
                  <th className="py-2 px-4 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.paymentIntentId}>
                    <td className="py-2 px-4 border border-gray-300 break-words">{payment.paymentIntentId}</td>
                    <td className="py-2 px-4 border border-gray-300">{payment.amount}$</td>
                    <td className="py-2 px-4 border border-gray-300">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
