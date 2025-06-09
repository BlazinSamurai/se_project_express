const { UNAUTH_USER } = require("../errors");

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = UNAUTH_USER;
  }
}

module.exports = { ForbiddenError };
