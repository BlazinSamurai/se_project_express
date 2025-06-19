// create middleware for authorization.
// It should verify the token from the headers
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

const handleAuthError = (res, req, next) => {
  next(new UnauthorizedError("Authorization Error: Unauthorized."));
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

// If there are no issues with the token,
// the middleware should add the token payload
// to the user object and call next()

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.error("Authorization header missing or incorrectly formatted.");
    handleAuthError(req, res, next);
    return;
  }

  // getting the token
  const token = extractBearerToken(authorization);
  let payload;

  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(req, res, next);
    return;
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
