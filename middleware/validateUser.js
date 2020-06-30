const Joi = require("joi");
module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    FirstName: Joi.string().min(3).max(50).required(),
    LastName: Joi.string().min(3).max(50).required(),
    Email: Joi.string().min(5).max(50).email().required(),
    Phone: Joi.string().min(5).max(25).required(),
    Password: Joi.string().min(4).max(30).required(),
    Picture: Joi.string().min(2).max(255),
  });

  try {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(401).json({ message: result.error.details[0].message });
    } else {
      next();
    }
  } catch (error) {
    return error.status(401).json({ message: "User Validation Failed" });
  }
};
