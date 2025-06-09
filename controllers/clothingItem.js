const ClothingItem = require("../models/clothingItem");
const { OKAY_STATUS } = require("../utils/errors");
const { BadRequestError } = require("../utils/errors/badRequestError");
const { NotFoundError } = require("../utils/errors/notFoundError");
const { ForbiddenError } = require("../utils/errors/forbiddenError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(OKAY_STATUS).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return next(new BadRequestError(e.message));
      }
      return next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(OKAY_STATUS).send(items);
    })
    .catch((e) => {
      console.error(e);
      return next(e);
    });
};

const likeItem = (req, res, next) => {
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
      console.error(e);
      if (e.name === "CastError") {
        return next(new BadRequestError("Invalid data."));
      }
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found."));
      }
      return next(e);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const owner = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found."));
      }
      if (item.owner.toString() !== owner.toString()) {
        return next(
          new ForbiddenError("You are not authorized to delete this item.")
        );
      }
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.send(deletedItem)
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return next(new BadRequestError("Invalid ID format."));
      }
      return next(e);
    });
};

const unlikeItem = (req, res, next) => {
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
        return next(new BadRequestError("Invalid data."));
      }
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError(e.message));
      }
      return next(e);
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
};
