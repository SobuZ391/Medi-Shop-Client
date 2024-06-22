import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';

const CategoryDetails = () => {
  const { categoryName } = useParams(); // Extract category name from URL
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  useEffect(() => {
    axios.get(`https://y-plum-nine.vercel.app/products?category=${categoryName}`)
      .then((res) => {
        const filteredMedicines = res.data.filter(medicine => medicine.categoryName === categoryName);
        setMedicines(filteredMedicines);
      })
      .catch((error) => console.error('Error fetching medicines:', error));
  }, [categoryName]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleSelect = (medicine) => {
    const existingMedicine = cart.find((item) => item._id === medicine._id);
    if (existingMedicine) {
      handleQuantityChange(medicine, existingMedicine.quantity + 1);
    } else {
      const updatedCart = [...cart, { ...medicine, quantity: 1 }];
      updateCart(updatedCart);
      swal("Added to Cart!", `${medicine.name} has been added to your cart.`, "success");
    }
  };

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
  };

  const handleQuantityChange = (medicine, quantity) => {
    if (quantity <= 0) {
      const updatedCart = cart.filter((item) => item._id !== medicine._id);
      updateCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) =>
        item._id === medicine._id ? { ...item, quantity } : item
      );
      updateCart(updatedCart);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAndSortedMedicines = medicines
    .filter(medicine => {
      return medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
             medicine.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

  const currentMedicines = filteredAndSortedMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedMedicines.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <Helmet>
        <title>Medi-Shop | Categories</title>
      </Helmet>
      <h1 className="text-center text-3xl text-gray-600 font-bold border-b-2 uppercase mx-auto my-4 p-2">
        {categoryName}
      </h1>
      
      <div className="flex justify-between gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border w-[60%] p-2 rounded"
        />
       <div className="mb-6"> <h1 className="text-lg font-bold underline" > Sort by Price :</h1>
        <div className="flex">
          <button  onClick={() => handleSort('asc')} className="btn    mr-2"> (Asc)</button>
          <button  onClick={() => handleSort('desc')} className="btn   "> (Desc)</button>
        </div></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-xl border-2 font-bold text-black py-2">ID</th>
              <th className="text-xl border-2 font-bold text-black py-2">Name</th>
              <th className="text-xl border-2 font-bold text-black py-2">Description</th>
              <th className="text-xl border-2 font-bold text-black py-2">Price</th>
              <th className="text-xl border-2 font-bold text-black py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 border px-4">{index + 1}</td>
                <td className="py-2 border px-4">{medicine.name}</td>
                <td className="py-2 border px-4">{medicine.description}</td>
                <td className="py-2 border px-4">{medicine.price}</td>
                <td className="py-2 border px-4 flex flex-col md:flex-row">
                  <button
                    className="btn border-2 outline-1 p-2 mr-2 mb-2 md:mb-0"
                    onClick={() => handleView(medicine)}
                  >
                    View <FaEye />
                  </button>
                  <button
                    onClick={() => handleSelect(medicine)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedMedicine && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full mx-4">
            <div className="p-4 border-b relative">
              <h3 className="text-xl font-semibold">{selectedMedicine.name}</h3>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-auto mb-4"
              />
              <p>{selectedMedicine.description}</p>
              <p>
                <strong>Price:</strong> $ {selectedMedicine.price}
              </p>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
