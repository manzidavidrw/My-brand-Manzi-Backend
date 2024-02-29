// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import dotenv from 'dotenv';
import commentRoutes from './routes/commentRoutes';
import * as swaggerDocument from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import messageRoutes from './routes/messageRoutes';
import likeRoutes from './routes/likeRoutes';
import userroutes from './routes/userroutes';
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
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument))



const PORT = process.env.PORT || '';

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export const closeServer = () => {
    server.close();
};

export default app
