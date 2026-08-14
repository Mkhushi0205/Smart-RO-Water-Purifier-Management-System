const express = require("express");
const router = express.Router();

const dashboardController = 
    require("../controllers/customer-dashboardController");

router.get(
    "/customer-dashboard", 
    dashboardController.getDashboard
);

module.exports = router;