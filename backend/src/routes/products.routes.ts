import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', ProductController.listValidators, ProductController.list);
router.get('/bulk/by-ids', ProductController.bulkByIdsValidators, ProductController.bulkByIds);
router.get('/:id', ProductController.get);

router.post('/', requireAuth, requireAdmin, ProductController.upsertValidators, ProductController.create);
router.put('/:id', requireAuth, requireAdmin, ProductController.upsertValidators, ProductController.update);
router.delete('/:id', requireAuth, requireAdmin, ProductController.remove);

export default router;
