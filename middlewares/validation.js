// Where to "4. Validate data from other sources"?

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  // We use validator.isURL() because it’s stricter than the built-in
  // Joi URI validator.
  if (validator.isURL(value)) {
    return value;
  }
  // string.uri is both the name of the default
  // validator and the name of the error code it raises, so here we
  // use that value to return the same kind of validation error that
  // the default URI validator does.
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image URL" field must be filled in',
      "string.uri": 'The "image URL" field must be a valid URL',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the "name" field is 2.',
      "string.max": 'The maximum length of the "name" field is 30.',
      "string.empty": 'The "name" field must be filled in.',
    }),
    avatar: Joi.string().required().custom(validateURL).message({
      "string.empty": 'The "avatar URL" field must be filled in.',
      "string.uri": 'The "avatar URL" field must be a valid URL.',
    }),
    email: Joi.string().required().email().message({
      "string.empty": 'The "email" field must be filled in.',
      "string.email": 'The "email" field must be a valid email.',
    }),
    password: Joi.string().required().min(8).message({
      "string.min": 'The minimum length of the "password" field is 8.',
      "string.empty": 'The "password" field must be filled in.',
    }),
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the "name" field is 2.',
      "string.max": 'The maximum length of the "name" field is 30.',
      "string.empty": 'The "name" field must be filled in.',
    }),
    avatar: Joi.string().required().custom(validateURL).message({
      "string.empty": 'The "avatar URL" field must be filled in.',
      "string.uri": 'The "avatar URL" field must be a valid URL.',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message({
      "string.empty": 'The "email" field must be filled in.',
      "string.email": 'The "email" field must be a valid email.',
    }),
    password: Joi.string().required().min(8).message({
      "string.min": 'The minimum length of the "password" field is 8.',
      "string.empty": 'The "password" field must be filled in.',
    }),
  }),
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.empty": 'The "id" field can not be empty',
      "string.length": 'The "id" field must have a length of 24',
    }),
  }),
});
