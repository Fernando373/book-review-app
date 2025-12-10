## Installation Guide LOCAL

### 1. Clone the repository

```bash
git clone git@github.com:Fernando373/book-review-app.git
cd book-review-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key

# Environment
NODE_ENV=development
```

**Important Notes:**
- Replace `DATABASE_URL` with your PostgreSQL connection string
- Generate a strong random string for `JWT_SECRET` (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### 4. Set up the database

Connect to your PostgreSQL database and run the schema:

```bash
psql -U your_username -d your_database -f database/schema.sql
```

Or manually execute the SQL commands from `database/schema.sql`:

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Installation Guide PRODUCTION

## Deployment to Railway

### 1. Prepare for production

Ensure your `.env` variables are set correctly for production:

```env
DATABASE_URL=your_railway_postgresql_url
JWT_SECRET=your_strong_production_secret
NODE_ENV=production
```

### 2. Deploy to Railway

1. Create a Railway account at https://railway.app
2. Create a new project
3. Add a PostgreSQL database to your project
4. Connect your GitHub repository
5. Add environment variables in Railway dashboard
6. Deploy!

### 3. Run database migrations

After deployment, connect to your Railway PostgreSQL and run the schema:

```bash
railway run psql < database/schema.sql
```
