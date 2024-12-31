const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  OKAY_STATUS,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  // name, weather, and imageUrl are the only thing that should
  // come from the req.body
  // eventually add like and createdAt properties below
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(OKAY_STATUS).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: e.message });
      }
      return res.status(DEFAULT).send({
        message: "An error has occurred on the server.",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(OKAY_STATUS).send(items);
    })
    .catch(() => {
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {
      // $addToSet — to add an item to the array if it's not there yet
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(OKAY_STATUS).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: e.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(OKAY_STATUS).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: e.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {
      // $pull — to remove an item from the array
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(OKAY_STATUS).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: e.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
};
