import { Request, Response } from 'express';
import { Wishlist } from '../models/wishlist.model.js';
import { Products } from '../models/product.model.js';

export const WishlistController = {
  async ids(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const ids = await Wishlist.listIds(userId);
    res.json(ids);
  },
  async products(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const ids = await Wishlist.listIds(userId);
    const products = await Products.listByIds(ids);
    res.json(products);
  },
  async add(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const { product_id } = req.body as { product_id: string };
    if (!product_id) return res.status(400).json({ error: 'product_id required' });
    await Wishlist.add(userId, product_id);
    res.status(201).json({ product_id });
  },
  async remove(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const { productId } = req.params;
    await Wishlist.remove(userId, productId);
    res.json({ product_id: productId });
  }
};
