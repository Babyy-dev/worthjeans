import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', AuthController.registerValidators, AuthController.register);
router.post('/login', AuthController.loginValidators, AuthController.login);
router.get('/me', requireAuth, AuthController.me);

export default router;
