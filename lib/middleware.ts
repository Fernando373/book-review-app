import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { verifyToken } from './auth';
import { UserPayload } from './types';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: UserPayload;
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const cookies = parse(req.headers.cookie || '');
      const token = cookies['auth-token'];

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
      }

      const payload = verifyToken(token);

      if (!payload) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      req.user = payload;

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
