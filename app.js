const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

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

// Authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "675884c3d452aa3d696ff714",
  };
  next();
});

// Order of Middleware: app.use(express.json())
// and app.use('/', mainRouter) should come after
// your authorization middleware to ensure that the
// user object is available across all routes.

// JSON parsing middleware
app.use(express.json());

// Main Router
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});
