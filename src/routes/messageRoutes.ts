// routes/messageRoutes.ts
import express from 'express';
import * as messageController from '../controllers/messageController';
import { isAuthenticated,isAdmin } from '../middlewares/authenticatication';
import * as auth from '../middlewares/authenticatication';
const router = express.Router();

router.post('/',messageController.createMessage);
router.get('/',messageController.getMessages);
router.get('/:id',messageController.getMessageById);
router.put('/:id',isAuthenticated,messageController.updateMessage);
router.delete('/:id',isAuthenticated,messageController.deleteMessage);

export default router;
