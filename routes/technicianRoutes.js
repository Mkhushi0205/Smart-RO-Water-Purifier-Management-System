const express = require("express");
const router = express.Router();

const technicianDashboardController = require("../controllers/techniciandashboardController");

router.get("/technician-dashboard",
    technicianDashboardController.getTechnicianDashboard
);

module.exports = router;