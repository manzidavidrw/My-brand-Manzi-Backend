import Joi from 'joi';

export const commentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  comment:Joi.string().required(),
  status:Joi.boolean().required(),
  BlogId:Joi.string().required()
});