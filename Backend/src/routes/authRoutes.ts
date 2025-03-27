import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Unified login endpoint
router.post('/login', login);


export default router;