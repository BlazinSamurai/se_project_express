const User = require("../models/user");
const {
  OKAY_STATUS,
  DEFAULT,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OKAY_STATUS).send(users);
    })
    .catch(() =>
      res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." })
    );
};

const createUsers = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      res.status(OKAY_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
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

module.exports = { getUsers, createUsers, getUser };
