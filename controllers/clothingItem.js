const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  // name, weather, and imageUrl are the only thing that should
  // come from the req.body
  // eventually add like and createdAt properties below
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({
        message: `"An error has occurred on the server.`,
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "An error has occurred on the server." });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: e.message });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {
      //$addToSet — to add an item to the array if it's not there yet
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(400).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: e.message });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(400).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: e.message });
      }
      return res
        .status(500)
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
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(400).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: e.message });
      }
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  likeItem,
  deleteItem,
  unlikeItem,
};
