import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// import "./Plans.css";
// import "./Users.css"; // Ensure this file contains necessary styles

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (planId) => {
    const updatedCart = cartItems.filter((item) => item._id !== planId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("❌ Plan removed from cart.");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    const stripe = await loadStripe("pk_test_51R7SBcCFLxdZxPlxttxn2QKC3W9HiIXyAN1q8aUo7lnW3WorkbssUkl1WlJ9t5NRIu9SzvSYybA6uUgqa5DLNnmG00yjBbaYwc");

    const body = {
      products: cartItems.map((item) => ({
        id: item._id,
        title: item.title,
        price: item.price,
      })),
    };

    try {
      const response = await fetch(`${axios.defaults.baseURL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("❌ Checkout failed.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
            alt="Empty Cart"
            className="w-64 h-64 mb-4"
          />
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link
            to="/plans"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Browse Plans
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700 text-lg">💰 ₹{item.price}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-2xl font-bold">Total: 💰 ₹{calculateTotal()}</h3>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            🛍️ Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;