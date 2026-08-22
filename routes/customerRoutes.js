const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer-dashboardController");
const { requireRole } = require("../middleware/auth");

router.get(
    "/customer-dashboard",
    requireRole("customer"),
    customerController.getCustomerDashboard
);

module.exports = router;