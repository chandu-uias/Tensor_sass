const express = require("express");
const { createPlan, updatePlan, deletePlan, getPlans } = require("../controllers/planController");

const router = express.Router();

router.post("/create-plan", createPlan);
router.put("/update-plan", updatePlan);
router.delete("/delete-plan", deletePlan);
router.get("/get-plans", getPlans);

module.exports = router;
