import Joi from 'joi';

export const messageSchema = Joi.object({
  content: Joi.string().required(),
  sender:Joi.string().required(),
  receiver:Joi.string().required()
});