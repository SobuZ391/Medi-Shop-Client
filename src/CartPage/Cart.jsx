import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const navigate = useNavigate();

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleRemoveFromCart = (medicineToRemove) => {
    const updatedCart = cart.filter(
      (medicine) => medicine._id !== medicineToRemove._id
    );
    updateCart(updatedCart);
    swal("Removed!", "Item has been removed from the cart.", "warning");
  };

  const handleClearCart = () => {
    updateCart([]);
    swal("Cleared!", "Your cart has been cleared.", "info");
  };

  const handleQuantityChange = (medicine, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(medicine);
    } else {
      const updatedCart = cart.map((item) =>
        item._id === medicine._id ? { ...item, quantity } : item
      );
      updateCart(updatedCart);

      if (quantity > medicine.quantity) {
        swal("Added!", `${medicine.name} quantity increased to ${quantity}.`, "success");
      }
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container min-h-screen border-2 rounded-xl mx-auto mt-8 p-4">
      <Helmet>
        <title>Medi-Shop |  Cart</title>
       
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-[65rem] mx-auto bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Company</th>
                  <th className="py-2 px-4 border">Price per Unit</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Total</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((medicine, index) => {
                  const price = parseFloat(medicine.price) || 0;
                  const quantity = parseInt(medicine.quantity, 10) || 0;
                  const total = price * quantity;

                  return (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{medicine.name}</td>
                      <td className="py-2 px-4 border">{medicine.company}</td>
                      <td className="py-2 px-4 border">${price.toFixed(2)}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() =>
                            handleQuantityChange(medicine, quantity - 1)
                          }
                          className="px-2"
                        >
                          -
                        </button>
                        {quantity}
                        <button
                          onClick={() =>
                            handleQuantityChange(medicine, quantity + 1)
                          }
                          className="px-2"
                        >
                          +
                        </button>
                      </td>
                      <td className="py-2 px-4 border">${total.toFixed(2)}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleRemoveFromCart(medicine)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
