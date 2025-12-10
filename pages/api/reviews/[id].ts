import type { NextApiResponse } from 'next';
import pool from '@/lib/db';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = req.user?.userId;

  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid review ID' });
  }

  const reviewId = Number(id);

  if (req.method === 'DELETE') {
    try {
      const reviewCheck = await pool.query(
        'SELECT user_id FROM reviews WHERE id = $1',
        [reviewId]
      );

      if (reviewCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }

      const review = reviewCheck.rows[0];

      if (review.user_id !== userId) {
        return res.status(403).json({ error: 'Forbidden - You can only delete your own reviews' });
      }

      await pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);

      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ error: 'Failed to delete review' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withAuth(handler);
