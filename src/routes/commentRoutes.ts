// src/routes/commentRoutes.ts
import express, { Router } from 'express';
import { CreateComment, getCommentsByBlogId, updateComment, deleteComment } from '../controllers/commentController';

const router: Router = express.Router();

// Create a new comment for the specified blog post
router.post('/:id/comments', CreateComment);

// Get comments for the specified blog post
router.get('/:id/comments', getCommentsByBlogId);

// Update a comment by its ID for the specified blog post
router.put('/:id/comments', updateComment);

// Delete a comment by its ID for the specified blog post
router.delete('/:id/comments', deleteComment);

export default router;
