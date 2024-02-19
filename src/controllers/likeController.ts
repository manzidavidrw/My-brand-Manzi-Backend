import {Response, Request} from 'express';
import Like from '../models/Like';
import {likeSchema} from '../validators/likeValidators';

export const createLike = async (req: Request, res: Response) => {
  try {
    const { like, blogId } = req.body;
    const { error, value } = likeSchema.validate({ like, blogId });
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
// export const getLikes = async (req: Request, res: Response) => {
//   try {
//     const { blogId } = req.params; 
//     const likes = await Like.find({ blogId }); 
    

//     res.status(200).json({ likes });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getLikes= async (req: Request, res: Response) => {
  try {
    const  blogId  = req.params.id;
    // const commentid=req.params.id;
      const blog = await Like.find();
     
      res.json(blog);

  const comment = new Like({like:req.body.like,blogId:req.params.id  });

  await comment.save();

  } catch (err) {
      res.status(500).json({ message: (err as Error).message });
  }
};

