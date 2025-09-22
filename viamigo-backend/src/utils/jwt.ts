import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET: string = process.env.JWT_SECRET || 'dev_secret';

/**
 * Sign a JWT token with the given payload
 * @param payload - payload to encode (object or string)
 * @param expiresIn - token expiration (default: 7 days)
 * @returns signed JWT token
 */
export function signToken(
  payload: object | string,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

/**
 * Verify a JWT token
 * @param token - JWT token to verify
 * @returns decoded payload or null if invalid
 */
export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
