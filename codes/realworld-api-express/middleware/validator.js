const { validationResult, buildCheckFunction } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports = module.exports = (validators) => {
  return async (req, res, next) => {
    await Promise.all(validators.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 不是一个有效的 ObjectID");
    }
  });
};
