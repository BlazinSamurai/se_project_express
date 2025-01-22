const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getUser, patchCurrentUser } = require("../controllers/users");

router.get("/me", auth, getUser);
router.patch("/me", auth, patchCurrentUser);

module.exports = router;
