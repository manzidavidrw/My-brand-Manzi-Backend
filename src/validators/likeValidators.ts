import Joi from 'joi';

export const likeSchema = Joi.object({
  like: Joi.boolean().required(),
  blogId: Joi.string().required(),
});