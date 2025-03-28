const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const userRoutes = require("./routes/userRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/user", userRoutes);
app.use("/api/subscription", subscriptionRoutes);

module.exports = app;
