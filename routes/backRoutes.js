const express = require("express");
const router = express.Router();
const backController = require("../controllers/backController");

router.post("/shorten", backController.createShortUrl);
router.get("/:id", backController.getShortUrl);

module.exports = router;
