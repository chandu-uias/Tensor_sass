const User = require("../models/users");

// Get users under organization
const getUserByOrganization = async (req, res) => {
  try {
    console.log("Received email", req.query); // Debugging to check received email
    const userEmail = req.query.email; // Org Admin email

    // Find the Org Admin in the database
    const orgAdmin = await User.findOne({ email: userEmail });

    if (!orgAdmin) {
      return res.status(400).json({ message: "Organization Admin not found" });
    }

    // Ensure usersUnderOrganization is not empty
    console.log("Org Admin users under organization:", orgAdmin.usersUnderOrganization);
    if (!orgAdmin.usersUnderOrganization || orgAdmin.usersUnderOrganization.length === 0) {
      return res.status(200).json({ message: "No users under this Org Admin", data: [] });
    }

    // Fetch only users whose emails exist in `usersUnderOrganization`
    const users = await User.find({
      email: { $in: orgAdmin.usersUnderOrganization }, // Match users by email
      role: "user", // Only fetch users with role 'user'
    }).select("name email role isActive"); // Fetch only necessary fields

    console.log("Filtered Users:", users);

    res.status(200).json({ message: "Retrieved users under Org Admin", data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add users to an organization
const addUsersToOrganization = async (req, res) => {
  try {
    console.log(req.body);
    const userEmail = req.body.email;
    const usersToBeAdded = req.body.users;

    // Find the user (Org Admin)
    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Combine existing users with the new ones
    const finalUsers = [...user.usersUnderOrganization, ...usersToBeAdded];

    // Check if the number of users exceeds the allowed limit
    if (finalUsers.length > user.maxAllowed) {
      return res.status(400).json({ message: "Users limit exceeded" });
    }

    // Update the user's usersUnderOrganization field
    await User.updateOne({ email: userEmail }, { $set: { usersUnderOrganization: finalUsers } });
    res.status(200).json({ message: "Users added to organization" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users, message: "Retrieved users" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUserByOrganization,
  addUsersToOrganization,
  getUsers, // Export the getUsers function
};
