import express from 'express';
import { createLike } from '../controllers/likeController';

const router = express.Router();

router.post('/likes', createLike);

export default router;