const Plan = require("../models/plan");
const User = require("../models/users");

exports.subscribeUser = async (req, res) => {
  const { planId, userEmail, organization } = req.body;
  const plan = await Plan.findById(planId);

  if (!plan) return res.status(400).json({ message: "Plan not found" });

  await User.updateOne(
    { email: userEmail },
    { plan: planId, role: "orgadmin", organization, subscribedDate: new Date(), remainingAllowed: plan.usersAllowed, maxAllowed: plan.usersAllowed }
  );
  res.status(200).json({ message: "User subscribed" });
};



const subscribeUser = async (req, res) => {
  try {
    console.log(req.body);
    const { planId, email, organization } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(400).json({ message: "Plan not found" });

    await User.updateOne(
      { email },
      {
        plan: planId,
        role: "orgadmin",
        organization,
        subscribedDate: new Date(),
        remainingAllowed: plan.usersAllowed,
        maxAllowed: plan.usersAllowed
      }
    );

    res.status(200).json({ message: "User subscribed successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { subscribeUser };

