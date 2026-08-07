const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.getHome);

router.get("/about", mainController.getAbout);

router.get("/contact", mainController.getContact);

module.exports = router;