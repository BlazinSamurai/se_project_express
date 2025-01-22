const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItem");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");

// some routes don't require auth
// for example, register and login
router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);

router.use(auth);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found." });
});

module.exports = router;
