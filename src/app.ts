// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();

app.use(express.json());


const dbURI = 'mongodb://localhost:27017/myblog';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/comments', commentRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
