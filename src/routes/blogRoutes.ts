import express from 'express';
import { isAuthenticated,isAdmin } from '../middlewares/authenticatication';
import * as blogController from '../controllers/blogController';
import upload from '../middlewares/imagemiddleware';


const router = express.Router();


router.post('/',isAuthenticated,upload.single('image'),blogController.createBlog);
router.get('/',isAuthenticated,blogController.getBlogs);
router.get('/:id', isAuthenticated,blogController.getBlogById);
router.patch('/:id', isAuthenticated,isAdmin,blogController.updateBlog);
router.delete('/:id', isAuthenticated,isAdmin,blogController.deleteBlog);

export default router;
