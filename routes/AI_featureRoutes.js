const express = require("express");
const router = express.Router();

const AI_featureController = require("../controllers/AI_featureController");

router.get("/AI_feature", AI_featureController.getAIPage);

router.post("/api/chat", AI_featureController.chatwithAI);

module.exports = router;