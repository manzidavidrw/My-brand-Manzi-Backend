
import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { Error } from 'mongoose';
import cloudinary from '../image/cloudimage';
import { blogValidationSchema } from '../validators/BlogValidationSchema';


export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        const { error } = blogValidationSchema.validate({title,content});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }


    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }


    const result = await cloudinary.uploader.upload(req.file.path);

        const blog = await Blog.create({ title, content,image: result.secure_url});

        res.status(201).json(blog);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        res.status(201).json(blogs);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err: any) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(blog);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted' });
    } catch (err: any) {
        res.status(500).json({ message: (err as Error).message });
    }
};
