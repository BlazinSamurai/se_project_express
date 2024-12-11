const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const routes = require("./routes");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log(`Connect to the DB.`);
  })
  .catch(console.error());

app.use((req, res, next) => {
  req.user = {
    _id: "67585e10a5bdb27059d3b606",
  };
  next();
});

app.use(express.json());

app.use(routes);

const { PORT = 3001 } = process.env;

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});
