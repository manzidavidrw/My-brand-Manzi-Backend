import express from 'express';
import { isAuthenticated } from '../middlewares/authenticatication';
import * as blogController from '../controllers/blogController';
import upload from '../middlewares/imagemiddleware';


const router = express.Router();
// const upload = multer({ dest: 'uploader/' });

router.post('/',upload.single('image'),blogController.createBlog);
router.get('/',blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
