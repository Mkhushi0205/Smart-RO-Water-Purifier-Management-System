const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-dashboardController");

router.get("/admin-dashboard", adminController.getAdminDashboard);

module.exports = router;