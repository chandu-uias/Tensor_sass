const mongoose = require("mongoose")

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    usersAllowed: {type: Number, required: true},
  },
  { timestamps: true }
);

module.export = mongoose.model("Plan", planSchema);
