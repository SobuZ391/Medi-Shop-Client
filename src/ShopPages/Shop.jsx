import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold btn underline shadow-xl mb-4">Medicine Shop</h2>
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
            {medicines.map((medicine,index) => (
              <tr key={medicine._id}>
                <td className="py-2 px-4 border">{index+1}</td>
                <td className="py-2 px-4 border">{medicine.name}</td>
                <td className="py-2 px-4 border">{medicine.company}</td>
                <td className="py-2 px-4 border">{medicine.price}</td>
                <td className="py-2 px-4 border">{medicine.discountPrice}</td>
                <td className="py-2 px-4  border">
                  <button
                    onClick={() => handleView(medicine)}
                    className="btn  mr-2"
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
