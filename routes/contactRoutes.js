const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

//contact page
router.get("/contact", contactController.getContact);

//contact form submit 
router.post("/contact", contactController.postContact);

module.exports = router;