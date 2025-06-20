const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItem");
const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validation");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors/notFoundError");

router.post("/signup", validateUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.use("/items", clothingItem);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found."));
});

module.exports = router;
