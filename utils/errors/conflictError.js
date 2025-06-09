const { CONFLICTING_REQ } = require("../errors");

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = CONFLICTING_REQ;
  }
}

module.exports = { ConflictError };
