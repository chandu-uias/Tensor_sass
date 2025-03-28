const Plan = require("../models/plan");

const createPlan = async (req, res) => {
  try {
    const { title, price, description, userAllowed, duration } = req.body;

    if (!title || !price || !description || !userAllowed || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const plan = new Plan({
      title: title,
      price: price,
      description: description, // Assuming you want to save description
      duration: duration, // Accept duration from frontend
      usersAllowed: userAllowed,
    });

    await plan.save();
    res.status(200).json({ message: "Plan created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    console.log(req.body);
    const planId = req.body.planId;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(400).json({ message: "Plan not found" });

    await Plan.updateOne({ _id: planId }, req.body);
    res.status(200).json({ message: "Plan updated" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    console.log(req.body);
    const planId = req.body.planId;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(400).json({ message: "Plan not found" });

    await Plan.deleteOne({ _id: planId });
    res.status(200).json({ message: "Plan deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json({ data: plans, message: "Retrieved plans" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createPlan,
  updatePlan,
  deletePlan,
  getPlans,
};
