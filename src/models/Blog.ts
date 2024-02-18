// src/models/Blog.ts
import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    Id: Number,
    title: String,
    content: String,
    author: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = model('Blog', blogSchema);

export default Blog;
