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
exports.deleteComment = exports.updateComment = exports.getCommentsByBlogId = exports.CreateComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const commentValidators_1 = require("../validators/commentValidators");
class CustomResponse {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    send(data, message, status) {
        return this.res.status(status).json({
            data,
            message
        });
    }
}
exports.default = CustomResponse;
const CreateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new CustomResponse(req, res);
    try {
        const { error, value } = commentValidators_1.commentSchema.validate(req.body);
        if (error) {
            return response.send(null, error.message, 400);
        }
        const { name, email, comment } = value;
        const { id: blogId } = req.params;
        const newComment = new Comment_1.default({
            name,
            email,
            comment,
            blogId,
            date: new Date(),
        });
        const savedComment = yield newComment.save();
        response.send(savedComment, 'Comment Created Successfully', 201);
    }
    catch (error) {
        const errorMessage = error;
        response.send(null, errorMessage, 500);
    }
});
exports.CreateComment = CreateComment;
const getCommentsByBlogId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const comments = yield Comment_1.default.find({ blog: blogId });
        res.json(comments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getCommentsByBlogId = getCommentsByBlogId;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedComment = yield Comment_1.default.findByIdAndUpdate(id, { content }, { new: true });
        res.json(updatedComment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Comment_1.default.findByIdAndDelete(id);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteComment = deleteComment;
