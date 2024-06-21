import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const CategoryDetails = () => {
  const { categoryName } = useParams(); // Extract category name from URL
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/products?category=${categoryName}`)
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

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-center text-3xl  text-gray-600 font-bold border-b-2 w-72 mx-auto my-4 p-2">
        {categoryName}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className=" text-xl font-bold text-black py-2">ID</th>
              <th className=" text-xl font-bold text-black py-2">Name</th>
              <th className=" text-xl font-bold text-black py-2">Description</th>
              <th className=" text-xl font-bold text-black py-2">Price</th>
              <th className=" text-xl font-bold text-black py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{medicine.name}</td>
                <td className="py-2 px-4">{medicine.description}</td>
                <td className="py-2 px-4">{medicine.price}</td>
                <td className="py-2 px-4 flex">
                  <button
                    className="btn border-2 outline-1 btn-sm mr-2"
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

      {selectedMedicine && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
            <div className="p-4 border-b">
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
                <strong>Price:</strong> {selectedMedicine.price}
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
