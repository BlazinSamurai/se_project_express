require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// const PORT = process.env.PORT || 3001;
const { PORT = 3001 } = process.env;

// Connecting to the database
// if you get an 'ECONNREFUSED ERROR' you might need to start
// Mongoose manually in the 'Services' app. Its set to automatic
// startup but might need to be maually set from time to time.
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log(`Connect to the DB.`);
  })
  .catch(console.error());

const app = express();

// Order of Middleware:
// app.use(express.json()) and app.use('/', mainRouter)
// should come after your authorization middleware to
// ensure that the user object is available across all routes.

// JSON parsing middleware
app.use(express.json());

app.use(cors());

app.use(requestLogger);

// Main Router
app.use("/", mainRouter);

// remove this code after passing the review.
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// error logger handler
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// our centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});
