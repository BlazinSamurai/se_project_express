const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  patchCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", patchCurrentUser);

module.exports = router;
