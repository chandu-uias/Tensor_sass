import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Plans.css";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    description: "",
    userAllowed: "",
    duration: "",
  });

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/get-plans");
        console.log("fetched plans",response.data.data);
        setPlans(response.data.data);
      } catch (error) {
        toast.error("Error fetching plans!");
      }
    };
    fetchPlans();
  }, []);

 
  const handleAddPlan = async () => {
    if (!newPlan.title || !newPlan.price || !newPlan.description || !newPlan.userAllowed || !newPlan.duration) {
      toast.warn("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("/create-plan", newPlan);
      toast.success("Plan added successfully!");
      setPlans([...plans, response.data]); // Ensure API response contains correct fields
      setNewPlan({ title: "", price: "", description: "", userAllowed: "", duration: "" });
    } catch (error) {
      toast.error("Error adding plan!");
    }
  };

  
  const handleEditPlan = async (id) => {
    const planToEdit = plans.find((plan) => plan._id === id);
    if (!planToEdit) return;

    const updatedPlan = {
      title: prompt("Enter new title:", planToEdit.title) || planToEdit.title,
      price: prompt("Enter new price:", planToEdit.price) || planToEdit.price,
      description: prompt("Enter new description:", planToEdit.description) || planToEdit.description,
      userAllowed: prompt("Enter new max users allowed:", planToEdit.userAllowed) || planToEdit.userAllowed,
      duration: prompt("Enter new duration (months):", planToEdit.duration) || planToEdit.duration,
    };

    try {
      await axios.put("/update-plan", { planId: id, ...updatedPlan });
      setPlans(plans.map((plan) => (plan._id === id ? { ...plan, ...updatedPlan } : plan)));
      toast.success("Plan updated successfully!");
    } catch (error) {
      toast.error("Error updating plan!");
    }
  };

  
  const handleDeletePlan = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await axios.delete("/delete-plan", { data: { planId: id } });
        setPlans(plans.filter((plan) => plan._id !== id));
        toast.success("Plan deleted successfully!");
      } catch (error) {
        toast.error("Error deleting plan!");
      }
    }
  };

  return (
    <div className="PricingApp">
      <div className="app-container">
        <header>
          <h1 className="header-topic">SaaS Plan Management</h1>
        </header>

       
        <div className="add-plan">
          <input type="text" placeholder="Plan Name" value={newPlan.title} onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} />
          <input type="number" placeholder="Price" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} />
          <textarea placeholder="Description" value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })} />
          <input type="number" placeholder="Max Users Allowed" value={newPlan.userAllowed} onChange={(e) => setNewPlan({ ...newPlan, userAllowed: e.target.value })} />
          <input type="number" placeholder="Duration (months)" value={newPlan.duration} onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })} />
          <button onClick={handleAddPlan}>Add Plan</button>
        </div>

      
        <div className="pricing-cards">
          {plans.map((plan) => (
            <div key={plan._id} className="PricingCard">
              <header>
                <h2>{plan.title || "No Title"}</h2>
                <p className="card-price">₹{plan.price}/year</p>
                <p className="user-limit">Max Users: {plan.userAllowed}</p>
                <p className="duration">Duration: {plan.duration} days</p>
              </header>
              <div className="card-features">
                {(plan.description || "").split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditPlan(plan._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeletePlan(plan._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
