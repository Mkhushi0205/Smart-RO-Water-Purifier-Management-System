const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/customer-dashboardController");

router.get("/customer-dashboard", (req, res) => {
    res.render("customer-dashboard");
});

module.exports = router;