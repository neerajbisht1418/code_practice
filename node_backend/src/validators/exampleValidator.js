const Joi = require('joi');
const { HTTP_STATUS } = require('../constants/appConstants');

const exampleSchema = Joi.object({
  name: Joi.string().required().max(50),
  description: Joi.string().max(500),
});

const validateExample = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

exports.validateCreateExample = validateExample(exampleSchema);
exports.validateUpdateExample = validateExample(exampleSchema);