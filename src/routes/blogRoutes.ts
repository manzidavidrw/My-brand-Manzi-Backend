// src/routes/blogRoutes.ts
import express from 'express';
import * as blogController from '../controllers/blogController';

const router = express.Router();

router.post('/', blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
