"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
// import cloudinary from 'cloudinary';
const BlogValidationSchema_1 = require("../validators/BlogValidationSchema");
// export const uploadImageToCloudinary = async (imagePath: string): Promise<string> => {
//     try {
//       const result = await cloudinary.v2.uploader.upload(imagePath);
//       return result.secure_url;
//     } catch (error) {
//       throw new Error('Error uploading image to Cloudinary');
//     }
// }
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { error } = BlogValidationSchema_1.blogValidationSchema.validate({ title, content });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        //     const imagePath = req.file ? req.file.path : undefined;
        // if (!imagePath) {
        //   return res.status(400).json({ error: 'No image uploaded' });
        // }
        // const imageUrl = await uploadImageToCloudinary(imagePath);
        const blog = yield Blog_1.default.create({ title, content });
        res.status(201).json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteBlog = deleteBlog;
