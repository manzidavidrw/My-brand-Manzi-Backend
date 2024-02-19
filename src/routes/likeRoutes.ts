import express from 'express';
import { createLike ,getLikes} from '../controllers/likeController';

const router = express.Router();

router.post('/:id/likes', createLike);
router.get('/:id/likes', getLikes)


export default router;