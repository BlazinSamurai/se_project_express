const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required."],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The email field is required."],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  // trying to find the user by email
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      // not found - rejecting the promise
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      // found - comparing hashes
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // the hashes didn't match, rejecting the promise
          return Promise.reject(new Error("Incorrect email or password"));
        }
        // authentication successful
        return user; // now user is available
      });
    });
};

module.exports = mongoose.model("user", userSchema);
