const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");
const {
  OKAY_STATUS, //200
  BAD_REQUEST, //400
  UNAUTH_REQUEST, //401
  NOT_FOUND, //404
  CONFLICTING_REQ, //409
  DEFAULT, //500
} = require("../utils/errors");

const getUser = (req, res) => {
  const { userId } = req;
  User.findById(userId)
    .orFail()
    // method is used to throw
    // an error if a query doesn't return any documents
    .then((user) => {
      res.status(OKAY_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: err.message + "req: " + req.body.avatar });
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

  //This route should only allow modification of the name and avatar fields.
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
      return res.send({
        message: `Error in patchCurrentUser. Name:${err.name}, Status:${err.status}, Code:${err.code}, Message:${err.message}`,
      });
    });
};

//signup
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // hashing the password
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash, // adding the hash to the database
      })
    )
    .then((user) => {
      res.status(OKAY_STATUS).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
      // res.send(user);
    })
    .catch((err) => {
      if (err.code == "11000") {
        return res
          .status(CONFLICTING_REQ)
          .send({ message: "Duplicatation Error." });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.send({
        message: `Error in createUser`,
      });
    });
};

//signin
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      //authentication successful! user is in the user variable
      //the controller should create a JSON web token (JWT) that expires after a week
      //JWT_SECRET contains a value of your secret key for the signature
      //Once the JWT has been created, it should be sent to the client.
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ReferenceError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `Should be 400 error: ${err.message}.` });
      }
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTH_REQUEST)
          .send({ message: "in login," + err.message });
      }
      return res.send({
        message: `Error in login, Status: ${err.status}, Code: ${err.code}, Message: ${err.message}!`,
      });
    });
};

module.exports = {
  getUser,
  patchCurrentUser,
  createUser,
  login,
};
