const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required."],
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: [true, "The weather field is required."],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
