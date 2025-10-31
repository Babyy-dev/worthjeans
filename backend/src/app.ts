import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();

export const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

const uploadsDir = path.resolve(process.cwd(), 'backend', 'uploads');
app.use('/uploads', express.static(uploadsDir, { maxAge: '7d', immutable: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Serve frontend build if present (compute __dirname for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../../dist');
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(frontendDir, 'index.html'));
  });
}

app.use(errorHandler);
