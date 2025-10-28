import { query } from '../utils/db.js';

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export const Users = {
  async findByEmail(email: string) {
    const rows = await query<UserRow>('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  },
  async insert(id: string, email: string, password_hash: string) {
    await query('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)', [id, email, password_hash]);
  },
  async roleOf(userId: string) {
    const rows = await query<{ role: 'admin' | 'user' }>('SELECT role FROM user_roles WHERE user_id = ? LIMIT 1', [userId]);
    return rows[0]?.role || 'user';
  },
  async setRole(userId: string, role: 'admin' | 'user') {
    if (role === 'admin') {
      await query('INSERT INTO user_roles (user_id, role) VALUES (?, ?) ON DUPLICATE KEY UPDATE role = VALUES(role)', [userId, 'admin']);
    } else {
      await query("DELETE FROM user_roles WHERE user_id = ? AND role = 'admin'", [userId]);
    }
  },
  async insertProfile(id: string, email: string, full_name: string | null) {
    await query('INSERT INTO profiles (id, email, full_name) VALUES (?, ?, ?)', [id, email, full_name]);
  },
  async recordLogin(userId: string, email: string) {
    const { randomUUID } = await import('crypto');
    await query('INSERT INTO user_activity (id, user_id, activity_type, metadata) VALUES (?, ?, ?, ?)', [randomUUID(), userId, 'user_login', JSON.stringify({ email })]);
  },
  async listWithRoles() {
    return query<any>(
      `SELECT u.id, u.email, u.created_at, 
              COALESCE(MAX(a.created_at), u.created_at) AS last_login,
              COALESCE((SELECT role FROM user_roles ur WHERE ur.user_id = u.id LIMIT 1), 'user') AS role
       FROM users u
       LEFT JOIN user_activity a ON a.user_id = u.id AND a.activity_type = 'user_login'
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );
  }
};
