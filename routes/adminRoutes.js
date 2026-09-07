const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-dashboardController");
const { requireRole } = require("../middleware/auth");

router.get("/admin-dashboard", 
    requireRole("admin"), 
    adminController.getAdminDashboard
);

module.exports = router;