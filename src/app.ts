// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';
import messageRoutes from './routes/messageRoutes';
import likeRoutes from './routes/likeRoutes';
import userroutes from './routes/userroutes';
import dotenv from 'dotenv';
const app = express();

app.use(express.json());

dotenv.config();
const dbURI = process.env.MONGODB_URI || '';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blogs', likeRoutes);
app.use('/api', userroutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app
