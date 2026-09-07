const express = require("express");
const router = express.Router();

const technicianDashboardController = require("../controllers/techniciandashboardController");
const { requireRole } = require("../middleware/auth");

router.get("/technician-dashboard",
    requireRole("technician"),
    technicianDashboardController.getTechnicianDashboard
);

module.exports = router;