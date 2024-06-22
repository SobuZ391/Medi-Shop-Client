import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import swal from "sweetalert";
import { Helmet } from 'react-helmet-async';

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    axios
      .get("https://y-plum-nine.vercel.app/products")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
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
             medicine.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
             medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Medi-Shop | Shop</title>
      </Helmet>
      <h2 className="text-2xl font-bold btn underline shadow-xl mb-4">Medicine Shop</h2>
      
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
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Discount Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine, index) => (
              <tr key={medicine._id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{medicine.name}</td>
                <td className="py-2 px-4 border">{medicine.company}</td>
                <td className="py-2 px-4 border">{medicine.price}</td>
                <td className="py-2 px-4 border">{medicine.discountPrice}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleView(medicine)}
                    className="btn mr-2"
                  >
                    View <FaEye></FaEye>
                  </button>
                  <button
                    onClick={() => handleSelect(medicine)}
                    className="btn mt-2 btn-success"
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <div id="modal-body">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedMedicine.name}
                </h2>
                <img
                  src={selectedMedicine.image}
                  alt={selectedMedicine.name}
                  className="w-32 h-32 mb-4"
                />
                <p>
                  <strong>Company:</strong> {selectedMedicine.company}
                </p>
                <p>
                  <strong>Price:</strong> {selectedMedicine.price}
                </p>
                <p>
                  <strong>Discount Price:</strong> {selectedMedicine.discountPrice}
                </p>
                <p>
                  <strong>Description:</strong> {selectedMedicine.description}
                </p>
                <p>
                  <strong>Category:</strong> {selectedMedicine.categoryName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
