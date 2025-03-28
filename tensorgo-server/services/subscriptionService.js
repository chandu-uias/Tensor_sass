const User = require("../models/users");

const checkForDurationCompletion = async () => {
  try {
    const users = await User.find({});
    const currentDate = new Date();

    for (const user of users) {
      if (!user.plan) continue;

      const expiryDate = new Date(user.subscribedDate);
      expiryDate.setDate(expiryDate.getDate() + user.plan.duration);

      if (currentDate > expiryDate) {
        await User.updateOne(
          { email: user.email },
          { plan: null, subscribedDate: null, remainingAllowed: 0, maxAllowed: 0 }
        );
      }
    }
  } catch (error) {
    console.error("Error in duration check:", error);
  }
};

module.exports = { checkForDurationCompletion };
