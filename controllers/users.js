const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { OKAY_STATUS } = require("../utils/errors");
const { BadRequestError } = require("../utils/errors/badRequestError");
const { NotFoundError } = require("../utils/errors/notFoundError");
const { ConflictError } = require("../utils/errors/conflictError");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    // method is used to throw
    // an error if a query doesn't return any documents
    .then((user) => {
      res.status(OKAY_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const patchCurrentUser = (req, res, next) => {
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
        return next(new BadRequestError(err.message));
      }
      if (err.name === "ValidationError") {
        return next(new UnauthorizedError(err.message));
      }
      return next(err);
    });
};

// signup
const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;

  if (!email) {
    return next(new BadRequestError("Email is required"));
  }
  if (!password) {
    return next(new BadRequestError("Password is required"));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("This email already exists"));
      }
      return bcrypt.hash(password, 10).then((hash) =>
        User.create({ name, avatar, email, password: hash }).then((user) =>
          res.status(OKAY_STATUS).send({
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          })
        )
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Duplication error."));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data."));
      }
      return next(err);
    });
};

// signin
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and Password fields are required."));
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
        return next(new BadRequestError(err.message));
      }
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  patchCurrentUser,
  createUser,
  login,
};
