// models/Message.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    sender: string;
    receiver: string;
    createdAt: Date;
}

const messageSchema: Schema = new Schema({
    content: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>('Message', messageSchema);
