import { Router } from 'express';
import authController from '../controllers/auth-controller';

const router = Router();

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

// refresh token route
router.post('/token', authController.refreshToken);

export default router;
