import { Router } from 'express';
import UserController from '../controllers/UserController.js'
import cors from 'cors';

const router = Router();

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
);
// Define routes
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/profile', UserController.profile);


export { router };
