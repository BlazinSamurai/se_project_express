const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getUsers, getUser, patchCurrentUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", auth, getUser);
router.patch("/me", auth, patchCurrentUser);

module.exports = router;
