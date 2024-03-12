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
  email: { type: String, required: true },
  comment: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'post',},
  date: { type: Date, default: new Date() },
});

 const comment = model<IComment>('Comments', SchemaComment);
 
 export default comment