import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../public/logo.png'; // Replace with your actual logo path
import { Helmet } from 'react-helmet-async';

const fetchAllSales = async () => {
  const response = await axios.get('https://y-plum-nine.vercel.app/payments');
  return response.data;
};

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);

  const { data: sales = [], isFetching, error } = useQuery({
    queryKey: ['allSales'],
    queryFn: fetchAllSales,
  });

  const handleFilterByDate = () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert('End date should be after start date');
      return;
    }

    const filtered = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });

    setFilteredSales(filtered);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add logo
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 15, 10, 50, 20);

    // Title
    doc.setFontSize(18);
    doc.text('Sales Report', 14, 40);

    // Subtitle with date range
    doc.setFontSize(12);
    doc.text(`Report for: ${startDate} to ${endDate}`, 14, 50);

    // Table
    const tableColumn = ["Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Date"];
    const tableRows = [];

    filteredSales.forEach(sale => {
      const saleData = [
        sale.mediName || 'N/A',
        sale.sellerEmail || 'N/A',
        sale.email || 'N/A',
        sale.amount !== undefined ? `$${sale.amount.toFixed(2)}` : 'N/A',
        sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'
      ];
      tableRows.push(saleData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    // Save PDF
    doc.save(`sales_report_${startDate}_${endDate}.pdf`);
  };

  return (
    <div>
     <Helmet>
        <title>Medi-Shop | Dashboard | Sales Report</title>
       
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>
      <h1 className='text-2xl font-bold p-4 underline text-green-500'>NB: You have to select the initial and final dates to show the data.</h1>
      <div className="flex mb-4">
        <input
          type="date"
          className="px-4 py-2 mr-2 border rounded"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 mr-2 border rounded"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleFilterByDate}
        >
          Filter
        </button>

      </div>
      <h1 className='font-bold text-lg text-green-400 shadow-sm underline border p-2' >NB: Atleast select 2 different date for getting 24 hour's data.</h1>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error fetching sales report.</p>}
      {!isFetching && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Medicine Name</th>
                <th className="border px-4 py-2">Seller Email</th>
                <th className="border px-4 py-2">Buyer Email</th>
                <th className="border px-4 py-2">Total Price</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id}>
                  <td className="border px-4 py-2">{sale.mediName || 'N/A'}</td>
                  <td className="border px-4 py-2">{sale.sellerEmail || 'N/A'}</td>
                  <td className="border px-4 py-2">{sale.email || 'N/A'}</td>
                  <td className="border px-4 py-2">{sale.amount !== undefined ? `$${sale.amount.toFixed(2)}` : 'N/A'}</td>
                  <td className="border px-4 py-2">{sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleDownloadPDF}
          disabled={filteredSales.length === 0}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default SalesReport;
