// 400 — invalid data passed to the methods for creating
// an item/user or updating an item, or invalid ID passed
// to the params.
const BAD_REQUEST = 400;

// 401 - an HTTP status code that indicates "Unauthorized" access
const UNAUTH_REQUEST = 401;

// 403
const UNAUTH_USER = 403;

// 404 — there is no user or clothing item with the
// requested id, or the request was sent to a
// non-existent address.
const NOT_FOUND = 404;

// 409 - a client was unable to create or update a resource
// because of a conflict with the resource's current state
const CONFLICTING_REQ = 409;

// 500 — default error. Accompanied by the message: "An
// error has occurred on the server."
const DEFAULT = 500;

// 200
const OKAY_STATUS = 200;

module.exports = {
  BAD_REQUEST,
  UNAUTH_REQUEST,
  UNAUTH_USER,
  NOT_FOUND,
  CONFLICTING_REQ,
  DEFAULT,
  OKAY_STATUS,
};
