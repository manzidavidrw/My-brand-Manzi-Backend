// user.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
    role: 'admin' | 'user';
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

export default mongoose.model<User>('User', userSchema);
