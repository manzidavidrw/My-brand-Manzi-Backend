import Joi from 'joi';

export const commentSchema = Joi.object({
  content: Joi.string().required(),
  sender:Joi.string().required(),
  receiver:Joi.boolean().required(),
  createdAt:Joi.string().required()
});