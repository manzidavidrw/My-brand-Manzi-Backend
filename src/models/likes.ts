import mongoose, { Schema, Document } from 'mongoose';

export interface Like extends Document {
  userId: string;
  blogId: string;
}

const likeSchema: Schema = new Schema({
  userId: { type: String, required: true },
  blogId: { type: String, required: true },
});

export default mongoose.model<Like>('Like', likeSchema);