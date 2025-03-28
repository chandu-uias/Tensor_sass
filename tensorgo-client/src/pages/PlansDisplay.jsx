import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";

const PlansDisplay = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/get-plans");
        setPlans(response.data.data);
      } catch (error) {
        toast.error("❌ Error fetching plans!");
      }
    };
    fetchPlans();
  }, []);

  const addToCart = (plan) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(plan);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`✅ ${plan.title} added to cart!`);
  };

  // Function to get dynamic descriptions based on plan name
  const getPlanDescription = (plan) => {
    switch (plan.name.toLowerCase()) {
      case "basic":
        return "Basic is Free for 14 Days";
      case "standard":
        return "More Fatures";
      case "plus":
        return "No restrictions";
      default:
        return plan.description || "No description available.";
    }
  };

  return (
    <div className="PricingApp">
      <div className="app-container">
        <header>
          <h1 className="header-topic">📜 Available Subscription Plans</h1>
        </header>

        <div className="pricing-cards">
          {plans.map((plan) => (
            <div key={plan._id} className="PricingCard">
              <header>
                <h2>{plan.title || "No Title"}</h2>
                <p className="card-price">💰 ₹{plan.price} / year</p>
              </header>

              <div className="plan-details">
                <p className="plan-description">
                  📌 <strong>Description:</strong> {getPlanDescription(plan)}
                </p>
                <p className="plan-limit">
                  🔹 <strong>Max Users Allowed:</strong> {plan.usersAllowed || "N/A"}
                </p>
                <p className="plan-duration">
                  ⏳ <strong>Duration:</strong> {plan.duration} days
                </p>
                <p className="plan-created">
                  🆕 <strong>Created On:</strong> {new Date(plan.createdAt).toLocaleDateString()}
                </p>
                <p className="plan-updated">
                  🔄 <strong>Last Updated:</strong> {new Date(plan.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="card-actions">
                <button className="subscribe-btn addplan" onClick={() => addToCart(plan)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansDisplay;
