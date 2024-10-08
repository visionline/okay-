

const AIModel = require("../model/AIModel"); // Import AI model logic
const Product = require("../model/Product"); // Import Product model

// Controller to evaluate products based on category and parameters
exports.evaluateProducts = async (req, res) => {
  const { category, parameters, additionalParams } = req.body;

  // Log incoming request data for debugging purposes
  console.log("Incoming request data:", category, parameters, additionalParams);

  try {
    // Step 1: Validate category
    if (!["Farm Products", "Plastic"].includes(category)) {
      return res.status(400).json({ error: "Invalid category selected." });
    }

    // Step 2: Call AI model to detect defects
    const aiResults = await AIModel.detectDefects(
      category,
      parameters,
      additionalParams
    );

    // Step 3: Prepare results object with category and parameters
    const updatedResults = {
      ...aiResults,
      category,
      parameter: parameters, // Adjusted to match the expected field in the Product model
    };

    // Step 4: Update counts in the Product database
    await Product.updateCounts(updatedResults);

    // Step 5: Separate products based on status (good or bad)
    const goodProducts = updatedResults.products.filter(
      (product) => product.status === "good"
    );
    const badProducts = updatedResults.products.filter(
      (product) => product.status === "bad"
    );

    // Step 6: Construct and send the response
    return res.status(200).json({
      message: "Evaluation completed successfully.",
      totalGood: updatedResults.goodCount,
      totalBad: updatedResults.badCount,
      goodProducts,
      badProducts,
      fullResults: updatedResults.products, // Return full evaluation results for further reference
    });
  } catch (error) {
    // Error handling for unexpected issues
    console.error("Error processing evaluation:", error.message || error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

exports.DetectProduct = async (req, res) => {
  const { selectedClass, selectedParameter } = req.body; // User input for class and parameters
 console.log("Inc request body:", selectedClass, selectedParameter);
  if (
    !selectedClass ||
    !selectedParameter ||
    !Array.isArray(selectedParameter)
  ) {
    return res
      .status(400)
      .json({ error: "Please provide a valid class and parameter(s)." });
  }

  const imagePath = "uploads/ok.jpeg"; // Path to the pre-uploaded image

  // Check if the image file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image file not found." });
  }

  const image = fs.readFileSync(imagePath, { encoding: "base64" });

  try {
    const response = await axios({
      method: "POST",
      url: `https://detect.roboflow.com/${selectedClass}/1`,
      params: {
        api_key: process.env.API_KEY,
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const predictions = response.data.predictions;

    // Filter predictions based on selected parameters
    const filteredPredictions = predictions.filter((prediction) =>
      selectedParameter.some((param) => prediction.class.includes(param))
    );

    if (filteredPredictions.length > 0) {
      return res.status(200).json({
        message: "Detection successful.",
        data: {
          predictions: filteredPredictions,
        },
      });
    } else {
      return res.status(200).json({
        message: "No matching objects detected in the image.",
        data: response.data,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error processing detection." });
  }
};