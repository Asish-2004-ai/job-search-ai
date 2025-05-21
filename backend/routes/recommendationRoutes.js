const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getJobRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

router.get("/", auth, getJobRecommendations);

module.exports = router;
