import { query } from '../utils/db.js';

export const Products = {
  async list({ is_active, is_featured, category, limit }: { is_active?: boolean; is_featured?: boolean; category?: string; limit?: number }) {
    const where: string[] = [];
    const params: any[] = [];
    if (is_active) where.push('p.is_active = 1');
    if (is_featured) where.push('p.is_featured = 1');
    if (category) {
      where.push('p.category = ?');
      params.push(category);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const sql = `SELECT p.* FROM products p ${whereSql} ORDER BY p.created_at DESC LIMIT ?`;
    params.push(limit ?? 50);
    return query(sql, params);
  },
  async get(id: string) {
    const rows = await query<any>('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },
  async listByIds(ids: string[]) {
    if (!ids.length) return [] as any[];
    const placeholders = ids.map(() => '?').join(',');
    return query<any>(`SELECT * FROM products WHERE id IN (${placeholders}) AND is_active = 1`, ids);
  },
  async create(id: string, data: any) {
    await query(
      'INSERT INTO products (id, name, slug, category, description, price, original_price, stock, image_url, images, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, data.name, data.slug, data.category || null, data.description || null, data.price, data.original_price || null, data.stock, data.image_url || null, data.images ? JSON.stringify(data.images) : null, data.is_featured ? 1 : 0, data.is_active ? 1 : 0]
    );
  },
  async update(id: string, data: any) {
    await query(
      'UPDATE products SET name=?, slug=?, category=?, description=?, price=?, original_price=?, stock=?, image_url=?, images=?, is_featured=?, is_active=? WHERE id=?',
      [data.name, data.slug, data.category || null, data.description || null, data.price, data.original_price || null, data.stock, data.image_url || null, data.images ? JSON.stringify(data.images) : null, data.is_featured ? 1 : 0, data.is_active ? 1 : 0, id]
    );
  },
  async remove(id: string) {
    await query('DELETE FROM products WHERE id = ?', [id]);
  }
};
