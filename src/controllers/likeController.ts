import {Response, Request} from 'express';
import Like from '../models/Like';
import {likeSchema} from '../validators/likeValidators';

export const createLike = async (req: Request, res: Response) => {
  try {
    const { like, blogId } = req.body;
    const { error } = likeSchema.validate({ like, blogId });
    if (error) {
      throw new Error(error.details[0].message);
    }
  
    const likes = new Like({ like, blogId });
    await likes.save();
    res.status(201).json({ message: 'Like created successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
}
};