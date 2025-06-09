const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItem");
const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validation");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

router.post("/signup", validateUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.use("/items", clothingItem);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found." });
});

module.exports = router;
