import Joi from 'joi';

export const likeSchema = Joi.object({
  userId: Joi.string().required(),
  blogId: Joi.string().required(),
});