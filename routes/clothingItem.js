const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");
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
router.post("/", auth, validateCardBody, createItem);
// Read
router.get("/", getItems);
// Update
router.put("/:itemId/likes", auth, validateItemId, likeItem);
// Delete
router.delete("/:itemId", auth, validateItemId, deleteItem);
router.delete("/:itemId/likes", auth, validateItemId, unlikeItem);

module.exports = router;
