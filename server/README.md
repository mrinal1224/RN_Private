# Express Server Setup

This is the backend server for the React Native app with JWT authentication, MongoDB, and password hashing.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

**Important Notes:**
- For MongoDB Atlas (cloud): Use connection string like `mongodb+srv://username:password@cluster.mongodb.net/myapp`
- For local MongoDB: Make sure MongoDB is running locally
- Change `JWT_SECRET` to a strong random string in production

### 3. Start MongoDB

**Local MongoDB:**
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or start manually
mongod
```

**MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string and update `.env`

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`

- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Health Check

- `GET /api/health` - Check if server is running

## Testing the API

You can test the API using curl or Postman:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Features

- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB connection
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Protected routes middleware

