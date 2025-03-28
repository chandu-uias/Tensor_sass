const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required:true,enum: ["superadmin", "orgadmin", "user"], default: "user" },
    organization: { type: String, },
    plan: {type: mongoose.Schema.Types.ObjectId, ref: "plans"},
    subscribedDate: {type: Date, required:false},
    maxAllowed: {type: Number, required: false},
    remainingAllowed: {type: Number, required: false},
    usersUnderOrganization: {type: Array, required: false},
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
