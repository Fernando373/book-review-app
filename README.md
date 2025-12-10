# Book Review App

A full-stack web application for creating and managing book reviews, built with Next.js, TypeScript, PostgreSQL, and Tailwind CSS.

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **HttpOnly Cookies** - Secure token storage

## Prerequisites

Before running this application, make sure you have:

- Node.js 20+ installed
- PostgreSQL database (local or hosted on Railway)
- npm or yarn package manager

## Installation

For detailed installation instructions, please check the [INSTALL.md](./INSTALL.md).

## 🎭 The "Mood" Field - A Unique Feature

One of the standout features of this app is the **Mood** field. When creating a review, users must select how they felt while reading the book. This adds an emotional dimension to book reviews that goes beyond traditional ratings.

**Available moods:**
- 😊 Happy
- 😢 Sad
- 🤩 Excited
- 🤔 Thoughtful
- 💡 Inspired
- 😌 Calm
- 😠 Angry
- 🥲 Nostalgic

This field helps readers understand not just what the reviewer thought about the book, but how it made them feel - providing deeper insight into the reading experience.


## 🎯 API Endpoints

### Authentication

#### POST `/api/signup`
Register a new user.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### POST `/api/login`
Login with email and password.

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** Sets an HttpOnly cookie with JWT token.

#### POST `/api/logout`
Logout (clears authentication cookie).

#### GET `/api/me`
Get current authenticated user information.

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Reviews (Protected Routes)

#### GET `/api/reviews`
Get all reviews with user information.

**Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "user_id": 1,
      "user_name": "John Doe",
      "book_title": "The Great Gatsby",
      "rating": 5,
      "review": "An amazing classic...",
      "mood": "thoughtful",
      "created_at": "2024-01-01T12:00:00Z"
    }
  ]
}
```

#### POST `/api/reviews`
Create a new review.

**Request body:**
```json
{
  "book_title": "1984",
  "rating": 5,
  "review": "A dystopian masterpiece that remains relevant today...",
  "mood": "thoughtful"
}
```

#### DELETE `/api/reviews/:id`
Delete a review (only the owner can delete).

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** "Error connecting to database"

**Solutions:**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Ensure database exists
- Check firewall/network settings

### Authentication Issues

**Problem:** "Unauthorized" errors

**Solutions:**
- Clear browser cookies
- Check `JWT_SECRET` is set
- Verify token hasn't expired
- Try logging in again

### Build Errors

### Build Errors

**Problem:** TypeScript errors

**Solutions:**
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Verify all imports are correct


### 📹 LIVE DEMO Check out the live demo of the Book Review App [here](https://book-review-app-production-8898.up.railway.app/login).