const express = require("express");

const router = express.Router();

const serviceHistoryController = 
    require("../controllers/serviceHistoryController");

const {
    requireRole
} = require("../middleware/auth");

router.get(
    "/service-history",
    requireRole("customer"),
    serviceHistoryController.getServiceHistory
);


module.exports = router;