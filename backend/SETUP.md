# Backend Setup Guide

## Prerequisites
- Node.js 18+ installed
- MySQL 8.0+ database (from Hostinger or local)
- npm or yarn package manager

## Step 1: Configure Environment Variables

Edit the `.env` file in the backend directory with your MySQL credentials:

```env
PORT=8080
CORS_ORIGIN=http://localhost:5173

# MySQL Database Configuration (from Hostinger)
DATABASE_HOST=your-mysql-host.mysql.hostinger.com
DATABASE_PORT=3306
DATABASE_USER=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_database_name

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Base URL for file uploads
BASE_URL=http://localhost:8080
```

## Step 2: Initialize Database

Run the SQL initialization script on your MySQL database:

```bash
# If using mysql command line:
mysql -h your-host -u your-user -p your_database < sql/init_with_admin.sql

# Or import via phpMyAdmin / Hostinger database panel
```

This will create all required tables and insert test users:
- **Admin**: admin@test.com / admin123
- **Customer**: customer@test.com / customer123

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Backend

```bash
# Development mode with auto-reload
npm run dev

# Production build
npm run build
npm start
```

The backend will run on `http://localhost:8080`

## Step 5: Update Frontend Configuration

Make sure the frontend `.env` file points to the backend:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Test the Setup

1. Start the backend: `npm run dev`
2. Visit the login page in your frontend
3. Use credentials: **admin@test.com** / **admin123**
4. You should be redirected to the admin panel

## Troubleshooting

### Database Connection Error
- Verify MySQL credentials in `.env`
- Check if MySQL server is running
- Ensure database exists and is accessible

### Admin Login Not Working
- Check if `init_with_admin.sql` was imported successfully
- Verify the admin user exists in the `users` table
- Check browser console and backend logs for errors

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Clear browser localStorage and try again

## API Endpoints

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/me` - Get current user
- **GET** `/api/products` - List products
- **GET** `/api/products/:id` - Get product details
- **POST** `/api/admin/products` - Create product (admin)
- **GET** `/api/wishlist` - Get user wishlist
- **POST** `/api/wishlist/:productId` - Add to wishlist
