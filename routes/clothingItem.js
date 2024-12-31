const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// C.R.U.D
// Create
router.post("/", createItem);
// Read
router.get("/", getItems);
// Update
router.put("/:itemId/likes", likeItem);
// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
