import express from 'express';
import cors from 'cors';
import { router as UserRoutes } from './routes/UserRoutes.js';
import { router as imagesRouter } from './routes/Images.js'; // Importing the router for image uploads
import cookieParser from 'cookie-parser'

const app = express();

// app.use(cors());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', UserRoutes);

// Mount the router for image uploads
app.use('/api/user', imagesRouter);


export { app };
