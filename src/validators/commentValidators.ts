import Joi from 'joi';

export const commentSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  comment:Joi.string().min(10).required(),
  status:Joi.boolean().required(),
  BlogId:Joi.string().required()
});