const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// C.R.U.D
// /items then "..." whatever you want for your URL
// Create
router.post("/", auth, createItem);
// Read
router.get("/", getItems);
// Update
router.put("/:itemId/likes", auth, likeItem);
// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
