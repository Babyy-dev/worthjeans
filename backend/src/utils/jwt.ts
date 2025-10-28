import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export function signToken(payload: object, expiresIn: string | number = '7d') {
  const secret = process.env.JWT_SECRET as Secret;
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload as any, secret, options);
}

export function verifyToken<T = any>(token: string): T {
  const secret = process.env.JWT_SECRET as Secret;
  return jwt.verify(token, secret) as T;
}
