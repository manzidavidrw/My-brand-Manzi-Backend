import {Response, Request} from 'express';
import Like from '../models/Like';
import {likeSchema} from '../validators/likeValidators';

export const createLike = async (req: Request, res: Response) => {
  try {
    const { userId, blogId } = req.body;
    const { error } = likeSchema.validate({ userId, blogId });
    if (error) {
      throw new Error(error.details[0].message);
    }
  
    const like = new Like({ userId, blogId });
    await like.save();
    res.status(201).json({ message: 'Like created successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};