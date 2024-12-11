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
    //a link to the item author's model of the ObjectId type
    type: mongoose.ObjectId,
    required: true,
  },
  // Bottom two elements are NOT required
  likes: {
    //list of users who liked the item, an ObjectId array with
    //a reference to the user modal (empty by default)
    type: mongoose.ObjectId,
    default: "",
  },
  createdAt: {
    type: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
