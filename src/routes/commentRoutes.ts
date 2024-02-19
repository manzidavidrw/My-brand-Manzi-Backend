// src/routes/commentRoutes.ts
import express, { Router } from 'express';
import { CreateComment, getCommentsByBlogId, updateComment, deleteComment } from '../controllers/commentController';

const router: Router = express.Router();


router.post('/:id/comments', CreateComment);


router.get('/:id/comments', getCommentsByBlogId);


router.put('/:id/comments', updateComment);


router.delete('/:id/comments', deleteComment);

export default router;
