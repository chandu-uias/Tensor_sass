const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const User = require("./models/users.js");
const Plan = require("./models/plan.js"); 
const connectDB = require('./config/db');
const authController = require("./controllers/authController");
const planController = require("./controllers/planController"); 
const userController = require("./controllers/userController");
const stripeService = require("./services/stripeService");
const { checkForDurationCompletion } = require("./services/subscriptionService");
const subscriptionController = require("./controllers/subscriptionController"); 
const app = express();
const port = process.env.PORT || 5015;


app.use(cors());
app.use(express.json());


connectDB();


app.post('/register-user', authController.registerUser);  
app.post("/login-user", authController.loginUser); 


app.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users, message: "Retrieved users" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});



app.post("/create-plan", planController.createPlan);
app.put("/update-plan", planController.updatePlan);
app.delete("/delete-plan", planController.deletePlan);
app.get("/get-plans", planController.getPlans);




app.get("/get-user-by-organization", userController.getUserByOrganization);
app.put("/add-users-to-organization", userController.addUsersToOrganization); 
app.get("/get-users", userController.getUsers); 

app.put("/subscribe", subscriptionController.subscribeUser);


checkForDurationCompletion();


const cron = require("node-cron");
cron.schedule("0 0 * * *", () => {
  console.log("Running daily subscription check...");
  checkForDurationCompletion();
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log("Product details:", products);

  try {
    
    const session = await stripeService.createCheckoutSession(products);
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});