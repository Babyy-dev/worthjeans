import { Request, Response } from 'express';
import { body, param, query as q, validationResult } from 'express-validator';
import { Products } from '../models/product.model.js';
import { randomUUID } from 'crypto';

export const ProductController = {
  listValidators: [
    q('is_active').optional().isIn(['0','1','true','false']),
    q('is_featured').optional().isIn(['0','1','true','false']),
    q('category').optional().isString(),
    q('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  async list(req: Request, res: Response) {
    const is_active = ['1', 'true'].includes(String(req.query.is_active || ''));
    const is_featured = ['1', 'true'].includes(String(req.query.is_featured || ''));
    const category = req.query.category ? String(req.query.category) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const rows = await Products.list({ is_active, is_featured, category, limit });
    res.json(rows);
  },

  async get(req: Request, res: Response) {
    const product = await Products.get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  },

  bulkByIdsValidators: [q('ids').isString()],
  async bulkByIds(req: Request, res: Response) {
    const ids = String(req.query.ids || '').split(',').filter(Boolean);
    const rows = await Products.listByIds(ids);
    res.json(rows);
  },

  upsertValidators: [
    body('name').isString().isLength({ min: 1, max: 100 }),
    body('slug').isString().isLength({ min: 1, max: 100 }),
    body('category').optional({ nullable: true }).isString().isLength({ max: 50 }),
    body('price').isFloat({ min: 0 }),
    body('original_price').optional({ nullable: true }).isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    body('image_url').optional({ nullable: true }).isString(),
    body('images').optional({ nullable: true }).isArray(),
    body('is_featured').isBoolean(),
    body('is_active').isBoolean(),
  ],
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const id = randomUUID();
    await Products.create(id, req.body);
    res.status(201).json({ id });
  },
  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    await Products.update(req.params.id, req.body);
    res.json({ id: req.params.id });
  },
  async remove(req: Request, res: Response) {
    await Products.remove(req.params.id);
    res.json({ id: req.params.id });
  }
};
