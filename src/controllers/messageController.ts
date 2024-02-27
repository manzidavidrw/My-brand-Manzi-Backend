// controllers/messageController.ts
import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';
import {messageSchema} from '../validators/messageValidotors'

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
       const { error, value } = messageSchema.validate(req.body);

    
    if (error) {
        res.status(400).json({ error: error.message });
    }
      const message: IMessage = req.body;
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save(); 
      res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
    
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = req.params.id;
        const messages = await Message.findById(messageId);
        if (!messages) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json(messages);
    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = req.params.id;
        const updatedMessage = await Message.findByIdAndUpdate(messageId, req.body, { new: true });
        if (!updatedMessage) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json(updatedMessage);
    } catch (error) {
       
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = req.params.id;
        await Message.findByIdAndDelete(messageId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
