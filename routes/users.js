const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUpdateUserInfo } = require("../middlewares/validation");
const { getUser, patchCurrentUser } = require("../controllers/users");

// first we'll call 'auth' and then,
// if the auth is successful,
// then runs the following routes
router.get("/me", auth, getUser);
router.patch("/me", auth, validateUpdateUserInfo, patchCurrentUser);

module.exports = router;
