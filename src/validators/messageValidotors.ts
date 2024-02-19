import Joi from 'joi';

export const messageSchema = Joi.object({
  content: Joi.string().min(30).required(),
  sender:Joi.string().min(2).required(),
  receiver:Joi.string().min(2).required()
});