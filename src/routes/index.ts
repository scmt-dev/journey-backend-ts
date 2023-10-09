import { Router } from 'express';
import userRoutes from './user-routes';
import authRoutes from './auth-routes';
import journeyRoutes from './journey-routes';
import { authMiddleware } from '../middleware/auth-middleware';
const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/journey', authMiddleware, journeyRoutes);

export default router;
