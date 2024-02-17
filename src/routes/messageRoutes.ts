// routes/messageRoutes.ts
import express from 'express';
import * as messageController from '../controllers/messageController';

const router = express.Router();

router.post('/',messageController.createMessage);
router.get('/', messageController.getMessages);
router.get('/:id', messageController.getMessageById);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

export default router;
