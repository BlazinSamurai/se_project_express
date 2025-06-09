const express = require("express");

const app = express();

// we handle all errors here, by logging the error to the console
// and sending a response with an appropriate status code and message
app.use((err, req, res, next) => {
  //this is the error handler
  console.error(err);
  res.status(err.statusCode.send({ message: err.message }));
});
