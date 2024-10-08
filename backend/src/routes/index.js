require("dotenv").config();
const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

// Home route
router.post("/evaluate", controller.evaluateProducts);

router.post('/Evaluate', controller.DetectProduct)
module.exports = router;
