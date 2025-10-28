import { query } from '../utils/db.js';

export const Wishlist = {
  async listIds(userId: string) {
    const rows = await query<{ product_id: string }>('SELECT product_id FROM wishlist WHERE user_id = ?', [userId]);
    return rows.map(r => r.product_id);
  },
  async add(userId: string, productId: string) {
    await query('INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)', [userId, productId]);
  },
  async remove(userId: string, productId: string) {
    await query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId]);
  }
};
