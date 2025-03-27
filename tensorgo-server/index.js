const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {User} = require("./model");
const Plan = require("./model/plan.js")



const app = express();
const port = process.env.PORT || 5015;
const mongoURL = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const client = mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;

app.post("/register-user", (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({message: "User registered"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});

app.post("/login-user", (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({message: "User Logged in"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});

app.post("/create-plan", (req, res) => {
    try {
        console.log(req.body);
        const plan = new Plan(req.body);
        plan.save();
        res.status(200).json({message: "Plan created"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});

app.put("/update-plan", (req, res) => {
    try {
        console.log(req.body);
        const planId = req.body.planId;
        const plan = Plan.findById({_id: planId});
        if(!plan) {
            return res.status(400).json({message: "Plan not found"});
        }
        Plan.updatedOne({_id: planId}, req.body);
        res.status(200).json({message: "Plan updated"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});


app.delete("/delete-plan", (req, res) => {
    try {
        console.log(req.body);
        const planId = req.body.planId;
        const plan = Plan.findById({_id: planId});
        if(!plan) {
            return res.status(400).json({message: "Plan not found"});
        }
        Plan.deleteOne({_id: planId});
        res.status(200).json({message: "Plan deleted"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});


app.get("/get-plans", (req, res) => {
    try {
        const plans = Plan.find({});
        res.status(200).json({data: plans, message: "retrieved plans"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});

app.get("/get-organizations", (req, res) => {
    try {
        const organizations = User.find({role: "orgadmin"});
        res.status(200).json({data: organizations, message: "retrieved organizations"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});


app.get("/get-users", (req, res) => {
    try {
        const users = User.find({});
        res.status(200).json({data: users, message: "retrieved users"});
    }
    catch (err) {
        res.status(400).json({message: err});
    }
});


app.get("/get-user-by-organization", (req, res) => {
    try {
        console.log(req.body);
        const userEmail = req.body.email;
        const user = User.find({email: userEmail});
        const usersUnderOrganization = user.usersUnderOrganization;
        const users = User.find({email: usersUnderOrganization});
        res.status(200).json({message: "retrieved user by organization", data: users});  
    } catch (error) {
        res.status(400).json({message: err});

    }
});

app.put("/subscribe", (req, res) => {
    try {
        console.log(req.body);
        const planId = req.body.planId;
        const userEmail = req.body.email;
        const plan = Plan.findbyId({_id: planId});
        User.updateOne({email: userEmail}, {plan: planId, subscribedDate: new Date(), remainingAllowed: plan.usersAllowed, maxAllowed: plan.usersAllowed});
        res.status(200).json({message: "User subscribed"});
    }
    catch (err) {
        return res.status(400).json({message: err});
    }
});

app.put("/add-users-to-organization", async(req, res)=> {
    try {
        console.log(req.body);
        const userEmail = req.body.email;
        const usersToBeAdded = req.body.users;
        const user = User.find({email: userEmail});
        const usersUnderOrganization = user.usersUnderOrganization;
        const finalUsers = usersUnderOrganization.concat(usersToBeAdded); 
        if(finalUsers.lenth() > user.maxAllowed) {
            return res.status(400).json({message: "Users limit exceeded"});
        }
    User.updatedOne({email: userEmail},{$push : {usersUnderOrganization: finalUsers}});
        res.status(200).json({message: "Users added to organization"});
    }
    catch(err) {
        res.status(400).json({message: err});
    }
})

const checkForDurationCompletion = async () => {
    const users = await User.find({});
    // users.forEach(async (user) => {
    //     const plan = await Plan.find({_id: user.plan});
    //     const currentDate = new Date();
    //     const subscribedDate = user.subscribedDate;
    //     const duration = plan.duration;
    //     const expiryDate = new Date(subscribedDate.setDate(subscribedDate.getDate() + duration));
    //     if (currentDate > expiryDate) {
    //         User.updateOne({email: user.email}, {plan: null, subscribedDate: null, remainingAllowed: 0, maxAllowed: 0});
    //     }
    // });
}

checkForDurationCompletion();

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server();