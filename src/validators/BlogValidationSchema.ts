import Joi from 'joi';

export const blogValidationSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(30).required(),
});
