const { UNAUTH_REQUEST } = require("../errors");

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = UNAUTH_REQUEST;
  }
}

module.exports = { UnauthorizedError };
