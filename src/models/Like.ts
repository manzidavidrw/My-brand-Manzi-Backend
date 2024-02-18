import mongoose, { Schema, Document } from 'mongoose';

export interface Like extends Document {
  like: Boolean;
  blogId: string;
}

const likeSchema: Schema = new Schema({
  like: { type: Boolean, required: true},
  blogId: { type: String, required: true },
});

export default mongoose.model<Like>('Like', likeSchema);