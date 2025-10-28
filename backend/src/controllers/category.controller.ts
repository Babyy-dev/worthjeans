import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Categories } from '../models/category.model.js';
import { randomUUID } from 'crypto';

export const CategoryController = {
  async list(_req: Request, res: Response) {
    const rows = await Categories.list();
    res.json(rows);
  },
  upsertValidators: [
    body('name').isString().isLength({ min: 1, max: 100 }),
    body('slug').isString().isLength({ min: 1, max: 100 }),
    body('description').optional({ nullable: true }).isString(),
    body('image_url').optional({ nullable: true }).isString(),
  ],
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const id = randomUUID();
    await Categories.create(id, req.body);
    res.status(201).json({ id });
  },
  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    await Categories.update(req.params.id, req.body);
    res.json({ id: req.params.id });
  },
  async remove(req: Request, res: Response) {
    await Categories.remove(req.params.id);
    res.json({ id: req.params.id });
  }
};
