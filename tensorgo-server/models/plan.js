const mongoose = require("mongoose")

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    usersAllowed: {type: Number, required: true},
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;