const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "orgadmin", "user"], default: "user" },
    organization: { type: String, },
    plan: {type: mongoose.Schema.Types.ObjectId, ref: "plans"},
    subscripedDate: {type: Date, required:true},
    maxAllowed: {type: Number, required: true},
    remainingAllowed: {type: Number, required: true},
    usersUnderOrganization: {type: Array, required: false},
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
