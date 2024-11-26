const router = require("express").Router();
const { createItem } = require("../controllers/clothingItem");

//C.R.U.D
//Create
router.post("/", createItem);

module.exports = router;
