const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

//C.R.U.D
//Create
router.post("/", createItem);
//Read
router.get("/", getItems);
//Update
router.put("/:itemId", updateItem);
//Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
