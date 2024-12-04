const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: true,
  },
  imageURL: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
  likes: {
    type: { type: mongoose.ObjectId, default: [] },
  },
  createdAt: {
    type: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
