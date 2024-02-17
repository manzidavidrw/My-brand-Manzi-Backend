// src/routes/commentRoutes.ts
import express, { Router } from 'express';
import { CreateComment, getCommentsByBlogId, updateComment, deleteComment } from '../controllers/commentController';

const router: Router = express.Router();

// Create a new comment for the specified blog post
router.post('/:id', CreateComment);

// Get comments for the specified blog post
router.get('/:id', getCommentsByBlogId);

// Update a comment by its ID for the specified blog post
router.put('/:id', updateComment);

// Delete a comment by its ID for the specified blog post
router.delete('/:id', deleteComment);

export default router;
