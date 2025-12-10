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
