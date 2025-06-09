// we handle all errors here, by logging the error to the console
// and sending a response with an appropriate status code and message
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error has occurred in the server";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
