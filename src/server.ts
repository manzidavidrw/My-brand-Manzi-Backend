import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose'

dotenv.config();

const PORT = process.env.PORT || '';
const dbURI = process.env.MONGODB_URI || '';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export const closeServer = () => {
    server.close();
};

export default server