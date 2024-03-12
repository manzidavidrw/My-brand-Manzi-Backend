import Joi from 'joi';

export const messageSchema = Joi.object({
  content: Joi.string().min(5).required(),
  sender:Joi.string().min(2).required(),
  email:Joi.string().email().required()
});