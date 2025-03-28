const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
// connectDB();

module.exports = connectDB;