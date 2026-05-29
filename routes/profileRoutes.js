const express = require("express");
const router = express.Router();

const controller = require("../controllers/profileController");

// Analyze GitHub profile
router.get("/analyze/:username", controller.analyzeProfile);

// Get all stored profiles
router.get("/", controller.getAllProfiles);

// Get single profile
router.get("/:username", controller.getProfile);

module.exports = router;