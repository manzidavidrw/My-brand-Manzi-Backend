import express from 'express';
// import multer from 'multer';
import * as blogController from '../controllers/blogController';


const router = express.Router();
// const upload = multer({ dest: 'uploader/' });

router.post('/',  blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
