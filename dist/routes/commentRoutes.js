"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/commentRoutes.ts
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
// Create a new comment for the specified blog post
router.post('/:id/comments', commentController_1.CreateComment);
// Get comments for the specified blog post
router.get('/:id/comments', commentController_1.getCommentsByBlogId);
// Update a comment by its ID for the specified blog post
router.put('/:id/comments', commentController_1.updateComment);
// Delete a comment by its ID for the specified blog post
router.delete('/:id/comments', commentController_1.deleteComment);
exports.default = router;
