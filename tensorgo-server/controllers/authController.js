// controllers/authController.js
const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
// Register a new user
const registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log request data

    const { name, email, password, role } = req.body;

    // Check if any required field is missing
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Unable to register user" });
  }
};




const loginUser = async (req, res) => {
  try {
    console.log("Login Request Data:", req.body); // Log request payload

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      console.log("Missing fields:", { email, password, role });
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    if (user.role.toLowerCase() !== role.toLowerCase()) {
      console.log(`Role mismatch: Expected ${user.role}, received ${role}`);
      return res.status(400).json({ message: "Invalid role" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Incorrect password for:", email);
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    console.log("✅ Login Successful:", { email, role });
    return res.status(200).json({ message: "User logged in successfully", token, user });

  } catch (error) {
    console.error("🔥 Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
};



module.exports = {
  registerUser,
  loginUser
};
