import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, WishlistController.ids);
router.get('/products', requireAuth, WishlistController.products);
router.post('/', requireAuth, WishlistController.add);
router.delete('/:productId', requireAuth, WishlistController.remove);

export default router;
