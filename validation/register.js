const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 3, max: 20 }))
    errors.name = "Name must be between 3 and 20 characters";
  if (!Validator.isLength(data.password, { min: 6, max: 20 }))
    errors.password = "Password must be at least 6 to 20 characters";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
