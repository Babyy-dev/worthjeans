import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', CategoryController.list);
router.post('/', requireAuth, requireAdmin, CategoryController.upsertValidators, CategoryController.create);
router.put('/:id', requireAuth, requireAdmin, CategoryController.upsertValidators, CategoryController.update);
router.delete('/:id', requireAuth, requireAdmin, CategoryController.remove);

export default router;
