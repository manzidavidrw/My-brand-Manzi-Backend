// src/controllers/commentsController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Blog from '../models/Blog';
import {commentSchema} from '../validators/commentValidators';

interface IReqBodyComment extends Request {
  body: {
    name: string;
    email: string;
    comment: string;
  };
  params: {
    id: string;
  };
}

class CustomResponse {
    private req: Request;
    private res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    send<T>(data: T, message: string, status: number) {
        return this.res.status(status).json({
            data,
            message
        });
    }
}

export default CustomResponse;


export const  CreateComment= async(req: IReqBodyComment, res: Response) =>{
  const response = new CustomResponse(req, res);
  try {
    const { error, value } = commentSchema.validate(req.body);

    if (error) {
      return response.send(null, error.message, 400);
    }

    const { name, email, comment } = value;
    const { id: blogId } = req.params;
    const newComment = new Comment({
      name,
      email,
      comment,
      blogId,
      date: new Date(),
    });
    const savedComment = await newComment.save();
    response.send<typeof savedComment>(
      savedComment,
      'Comment Created Successfully',
      201,
    );
  } catch (error) {
    const errorMessage = error as string;
    response.send(null, errorMessage as string, 500);
  }
}

export const getCommentsByBlogId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
