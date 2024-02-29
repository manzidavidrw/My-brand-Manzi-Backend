// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import cors from "cors";
import commentRoutes from './routes/commentRoutes';
import * as swaggerDocument from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import messageRoutes from './routes/messageRoutes';
import likeRoutes from './routes/likeRoutes';
import userroutes from './routes/userroutes';
const app = express();

app.use(express.json());



app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blogs', likeRoutes);
app.use('/api', userroutes);
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use(cors());




export default app
