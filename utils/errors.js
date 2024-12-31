// 400 — invalid data passed to the methods for creating
// an item/user or updating an item, or invalid ID passed
// to the params.
const BAD_REQUEST = 400;

// 404 — there is no user or clothing item with the
// requested id, or the request was sent to a
// non-existent address.
const NOT_FOUND = 404;

// 500 — default error. Accompanied by the message: "An
// error has occurred on the server."
const DEFAULT = 500;

// 200
const OKAY_STATUS = 200;

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  OKAY_STATUS,
};
