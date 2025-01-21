// create middleware for authorization.
// It should verify the token from the headers
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { BAD_REQUEST } = require("../utils/errors");

const handleAuthError = (res) => {
  // res.status(BAD_REQUEST).send({ message: 'Authorization Error' });
  res.send({
    message: res,
    // "Status: " +
    // res.status +
    // ", Code: " +
    // res.code +
    // ", Message: " +
    // res.message,
  });
};

// getting the token
const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // If there are no issues with the token,
  // the middleware should add the token payload
  // to the user object and call next()

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
