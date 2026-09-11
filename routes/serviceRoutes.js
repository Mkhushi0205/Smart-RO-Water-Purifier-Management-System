const express = require("express");
const router = express.Router();

const serviceController = 
    require("../controllers/serviceController");

const {
    requireRole
} = require("../middleware/auth");

router.get(
    "/services", 
    serviceController.getServices
);

router.post(
    "/book-service", 
    requireRole("customer"),
    serviceController.bookService
);

module.exports = router;