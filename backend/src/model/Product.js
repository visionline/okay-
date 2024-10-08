const mongoose = require("mongoose");

// Product schema to track counts for plastic and agricultural products
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["plastic", "agriculture"], // Limit categories to "plastic" and "agriculture"
  },
  goodCount: { type: Number, default: 0 }, // Total good count
  badCount: { type: Number, default: 0 }, // Total bad count
  evaluationHistory: [
    {
      parameter: {
        type: String,
        required: true,
        enum: function () {
          if (this.category === "plastic") {
            return ["reusable", "non-reusable"];
          } else if (this.category === "agriculture") {
            return ["perishable", "non-perishable"];
          }
        }, // Limit parameters based on category
      },
      goodCount: { type: Number, default: 0 }, // Good count for this parameter
      badCount: { type: Number, default: 0 }, // Bad count for this parameter
      products: [
        {
          name: { type: String, required: true }, // Product name
          status: {
            type: String,
            enum: ["good", "bad"],
            required: true, // "good" or "bad" status
          },
        },
      ],
      timestamp: { type: Date, default: Date.now }, // When the evaluation was done
    },
  ],
});

// Method to update the counts in the database
productSchema.statics.updateCounts = async function (results) {
  const { category, goodCount, badCount, parameter, products } = results;

  // Ensure the parameter matches the category
  if (
    (category === "plastic" &&
      !["reusable", "non-reusable"].includes(parameter)) ||
    (category === "agriculture" &&
      !["perishable", "non-perishable"].includes(parameter))
  ) {
    throw new Error(`Invalid parameter ${parameter} for category ${category}`);
  }

  // Find the product document based on category (plastic/agriculture)
  let product = await this.findOne({ category });

  // If the product category doesn't exist, create a new document
  if (!product) {
    product = new this({
      category,
      goodCount,
      badCount,
      evaluationHistory: [{ parameter, goodCount, badCount, products }],
    });
  } else {
    // Update the overall good and bad counts
    product.goodCount += goodCount;
    product.badCount += badCount;

    // Add the current evaluation to the history
    product.evaluationHistory.push({
      parameter, // "reusable", "non-reusable", "perishable", or "non-perishable"
      goodCount,
      badCount,
      products, // List of products and their status
    });
  }

  // Save the updated product document
  await product.save();
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
