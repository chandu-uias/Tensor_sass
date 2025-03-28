const express = require("express");
const { subscribeUser } = require("../controllers/subscriptionController");

const router = express.Router();

router.put("/subscribe", subscribeUser);

module.exports = router;
