import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/users', AdminController.users);
router.post('/users/:id/role', AdminController.setRole);
router.get('/analytics', AdminController.analytics);

export default router;
