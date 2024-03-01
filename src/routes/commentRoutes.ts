// src/routes/commentRoutes.ts
import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/authenticatication';
import { CreateComment, getCommentsByBlogId, updateComment, deleteComment } from '../controllers/commentController';

const router: Router = express.Router();

router.post('/:id/comments',CreateComment);

router.get('/:id/comments',getCommentsByBlogId);

router.put('/:id/comments', isAuthenticated,updateComment);

router.delete('/:id/comments',isAuthenticated,deleteComment);

export default router;
