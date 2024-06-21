import React from 'react';

function MedicineRow({ medicine, addToCart }) {
  return (
    <tr>
      <td className="border px-4 py-2">{medicine.name}</td>
      <td className="border px-4 py-2">{medicine.price}</td>
      <td className="border px-4 py-2">{medicine.company}</td>
      <td className="border px-4 py-2 flex justify-around">
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => console.log('View button clicked')}
        >
          View
        </button>
        <button 
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => addToCart(medicine)}
        >
          Select
        </button>
      </td>
    </tr>
  );
}

export default MedicineRow;
