import type { NextApiResponse } from "next";
import pool from "@/lib/db";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";
import { isValidRating } from "@/lib/auth";
import { CreateReviewInput, Review } from "@/lib/types";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const result = await pool.query<Review>(
        `SELECT r.id, r.user_id, r.book_title, r.rating, r.review, r.mood, r.created_at, u.name as user_name
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         ORDER BY r.created_at DESC`
      );

      return res.status(200).json({ reviews: result.rows });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
  }

  if (req.method === "POST") {
    try {
      const { book_title, rating, review, mood }: CreateReviewInput = req.body;
      const userId = req.user?.userId;

      if (!book_title || !rating || !review || !mood) {
        return res
          .status(400)
          .json({
            error: "All fields are required (book_title, rating, review, mood)",
          });
      }

      if (book_title.trim().length < 1) {
        return res.status(400).json({ error: "Book title cannot be empty" });
      }

      if (!isValidRating(rating)) {
        return res
          .status(400)
          .json({ error: "Rating must be an integer between 1 and 5" });
      }

      if (review.trim().length < 10) {
        return res
          .status(400)
          .json({ error: "Review must be at least 10 characters long" });
      }

      if (mood.trim().length < 1) {
        return res
          .status(400)
          .json({ error: "Mood field is required and cannot be empty" });
      }

      const result = await pool.query<Review>(
        `INSERT INTO reviews (user_id, book_title, rating, review, mood)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, user_id, book_title, rating, review, mood, created_at`,
        [userId, book_title.trim(), rating, review.trim(), mood.trim()]
      );

      const newReview = result.rows[0];

      return res.status(201).json({
        message: "Review created successfully",
        review: newReview,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(500).json({ error: "Failed to create review" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default withAuth(handler);
