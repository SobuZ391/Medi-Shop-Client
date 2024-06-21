import React, { useState } from 'react';
import ManageMedicines from './ManageMedicines';
import PaymentHistory from './PaymentHistory';
import AskForAdvertisement from './AskForAdvertisement';
import { Link } from 'react-router-dom';
import UserDashboard from './../../../Dashboard/UserDashboard/UserDashboard';

const SellerDashboard = () => {
  const [revenue, setRevenue] = useState({
    paidTotal: 0,
    pendingTotal: 0,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
       
       <PaymentHistory></PaymentHistory>
 
      
    </div>
  );
};

export default SellerDashboard;
