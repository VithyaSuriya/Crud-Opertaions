const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
module.exports = { userSchema, loginSchema, idSchema };
