export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserPayload {
  userId: number;
  email: string;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Review {
  id: number;
  user_id: number;
  book_title: string;
  rating: number;
  review: string;
  mood: string;
  created_at: string;
  user_name?: string;
}

export interface CreateReviewInput {
  book_title: string;
  rating: number;
  review: string;
  mood: string;
}
