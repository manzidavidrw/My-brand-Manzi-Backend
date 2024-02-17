import { Schema, model,Types } from 'mongoose';


export interface IComment {
  name: string;
  email: string;
  comment: string;
  status: boolean;
  blogId: Types.ObjectId;
  date: Date;
}
const SchemaComment = new Schema<IComment>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'post',},
  date: { type: Date, required: true, default: new Date() },
});

 const comment = model<IComment>('Comments', SchemaComment);
 
 export default comment