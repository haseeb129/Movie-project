const Joi = require("joi");
module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    Name: Joi.string().min(2).required().max(50),
    Director: Joi.string().min(2).required().max(50),
    Cast: Joi.string().min(3).required().max(255),
    Platinum: Joi.number().required().min(100).max(10000),
    Silver: Joi.number().required().min(100).max(10000).positive(),
    Gold: Joi.number().required().min(2).max(10000).positive(),
    Picture: Joi.any().allow(),
  });

  try {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).json({ message: result.error.details[0].message });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed In movie Updation" });
  }
};
