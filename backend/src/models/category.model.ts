import { query } from '../utils/db.js';

export const Categories = {
  async list() {
    return query<any>('SELECT * FROM categories ORDER BY name ASC');
  },
  async create(id: string, data: any) {
    await query('INSERT INTO categories (id, name, slug, description, image_url) VALUES (?, ?, ?, ?, ?)', [id, data.name, data.slug, data.description || null, data.image_url || null]);
  },
  async update(id: string, data: any) {
    await query('UPDATE categories SET name=?, slug=?, description=?, image_url=? WHERE id=?', [data.name, data.slug, data.description || null, data.image_url || null, id]);
  },
  async remove(id: string) {
    await query('DELETE FROM categories WHERE id = ?', [id]);
  }
};
