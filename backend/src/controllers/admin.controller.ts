import { Request, Response } from 'express';
import { Users } from '../models/user.model.js';
import { query } from '../utils/db.js';

export const AdminController = {
  async users(_req: Request, res: Response) {
    const list = await Users.listWithRoles();
    res.json(list);
  },
  async setRole(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { role } = req.body as { role: 'admin' | 'user' };
    await Users.setRole(id, role);
    res.json({ id, role });
  },
  async analytics(_req: Request, res: Response) {
    const totalUsersRows = await query<any>('SELECT COUNT(*) as totalUsers FROM users');
    const totalUsers = totalUsersRows[0]?.totalUsers || 0;
    const newUsersRows = await query<any>('SELECT COUNT(*) as c FROM users WHERE DATE(created_at) = CURDATE()');
    const totalLoginsRows = await query<any>("SELECT COUNT(*) as c FROM user_activity WHERE activity_type='user_login'");
    const recentActivity = await query<any>('SELECT id, activity_type, metadata, created_at FROM user_activity ORDER BY created_at DESC LIMIT 10');

    res.json({
      totalUsers,
      newUsersToday: newUsersRows[0]?.c || 0,
      totalLogins: totalLoginsRows[0]?.c || 0,
      recentActivity,
    });
  }
};
