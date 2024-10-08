const express = require("express");
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads and image detection
router.post("/", upload.single("image"), (req, res) => {
  const imagePath = req.file.path; // Get the uploaded file's path

  // Check if the file was uploaded
  if (!imagePath) {
    return res.status(400).send({ error: "Image is required." });
  }

  // Read the image file and encode it as base64
  const image = fs.readFileSync(imagePath, { encoding: "base64" });

  // Send the image to RoboFlow API for detection
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/plastic-detection-model/1",
    params: {
      api_key: "EqpGVWmUmvZkK24VOpD2",
    },
    data: image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      const predictions = response.data.predictions;

      if (predictions.length > 0) {
        // If predictions exist, return them
        res.status(200).json({
          message: "Plastic detection successful.",
          data: {
            predictions: predictions,
          },
        });
      } else {
        // If no predictions, return a different message
        res.status(200).json({
          message: "No plastic detected in the image.",
          data: response.data,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while detecting plastic in the image.",
        details: error.message,
      });
    });
});

module.exports = router;
