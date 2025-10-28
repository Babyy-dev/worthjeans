import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Users } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { query } from '../utils/db.js';
import { randomUUID } from 'crypto';

export const AuthController = {
  registerValidators: [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('full_name').optional().isString().isLength({ min: 1, max: 100 }),
  ],
  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, full_name } = req.body as { email: string; password: string; full_name?: string };
    const existing = await Users.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const id = randomUUID();
    const password_hash = await hashPassword(password);
    await Users.insert(id, email, password_hash);
    await Users.insertProfile(id, email, full_name || null);
    await query('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [id, 'user']);

    return res.status(201).json({ message: 'Registered' });
  },

  loginValidators: [
    body('email').isEmail(),
    body('password').isString(),
  ],
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body as { email: string; password: string };
    const user = await Users.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const role = await Users.roleOf(user.id);
    await Users.recordLogin(user.id, email);

    const token = signToken({ id: user.id, email: user.email, role });
    res.json({ token, user: { id: user.id, email: user.email, role } });
  },

  async me(req: Request, res: Response) {
    const user = (req as any).user;
    const profile = await query<{ full_name: string | null }>('SELECT full_name FROM profiles WHERE id = ? LIMIT 1', [user.id]);
    res.json({ user: { ...user, full_name: profile[0]?.full_name || null } });
  },
};
