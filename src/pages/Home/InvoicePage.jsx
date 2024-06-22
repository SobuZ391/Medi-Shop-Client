// src/pages/InvoicePage.js
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../public/logo.png"; // Make sure the path to your logo image is correct
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePage = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  const handlePrint = () => {
    const doc = new jsPDF();

    // Logo
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 15, 15, 40, 15);

      // Invoice Header
      doc.setFontSize(18);
      doc.text("Invoice", 140, 25);

      // User Information
      doc.setFontSize(12);
      doc.text("Customer Name:", 15, 45);
      doc.text("Address:", 15, 55);
      // Add more user information fields as needed

      // Purchase Information
      doc.setFontSize(12);
      doc.text("Total Amount Paid:", 15, 85);
      doc.text("$" + amount.toFixed(2), 85, 85);

      // Footer
      doc.setFontSize(10);
      doc.text("Thank you for your purchase!", 15, 120);
      doc.text("If you have any questions, please contact our support team.", 15, 130);

      // Save PDF
      doc.save("invoice.pdf");
    };
  };

  return (
    <div className="max-w-lg h-[100%] mx-auto p-4 border rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      <p className="mb-4 btn btn-success">Thank you for your purchase!</p>
      <p className="mb-2 border-2 p-4 rounded-xl">
        <strong>Total Amount Paid:</strong> ${amount.toFixed(2)}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Print Invoice
      </button>
      <div>
        <img src="https://img.freepik.com/free-photo/3d-payment-terminal-bank-card-blue-checkmark_107791-17014.jpg?w=826&t=st=1718786240~exp=1718786840~hmac=897866cae02784eaa3f2e4f3c22aead1bbccd256ef92772aa6456b608aeb69e7" alt="Payment Terminal" className="mt-4"/>
      </div>
    </div>
  );
};

export default InvoicePage;
