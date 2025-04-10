const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  OKAY_STATUS, // 200
  BAD_REQUEST, // 400
  UNAUTH_REQUEST, // 401
  NOT_FOUND, // 404
  CONFLICTING_REQ, // 409
  DEFAULT, // 500
} = require("../utils/errors");

const getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    // method is used to throw
    // an error if a query doesn't return any documents
    .then((user) => {
      res.status(OKAY_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

const patchCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  // This route should only allow modification of the name and avatar fields.
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true } // Return the updated document
  )
    .then((user) => {
      res.status(OKAY_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        // send the 400 error
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

// signup
const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  //error might be in auth.js in react project
  console.log("In createUser, express.");
  console.log(req.body);
  // hashing the password
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash, // adding the hash to the database
        name,
        avatar,
      })
    )
    .then((user) => {
      res.status(OKAY_STATUS).send({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(CONFLICTING_REQ)
          .send({ message: "Duplicatation Error." });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(DEFAULT).send({
        message: "An error has occurred on the server." + err.message,
      });
    });
};

// signin
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password must be provided." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful!
      // the controller should create a JSON web token (JWT) that expires after a week
      // JWT_SECRET contains a value of your secret key for the signature
      // Once the JWT has been created, it should be sent to the client.
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ReferenceError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTH_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getUser,
  patchCurrentUser,
  createUser,
  login,
};
