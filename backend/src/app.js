import express from 'express';
import cors from 'cors';
import { router as UserRoutes } from './routes/UserRoutes.js'; // Importing router as UserRoutes

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/user', UserRoutes);

export { app };
