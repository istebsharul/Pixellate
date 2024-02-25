import { Router } from 'express';
import UserController from '../controllers/UserController.js'

const router = Router();

// Define routes
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);

export { router };
