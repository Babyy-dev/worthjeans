import { Router } from 'express';
import { UploadController, uploader } from '../controllers/upload.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireAdmin, uploader.single('file'), UploadController.single);

export default router;
