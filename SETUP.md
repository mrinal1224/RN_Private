# Complete Setup Guide

## Backend Server Setup

### 1. Navigate to server directory
```bash
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a `.env` file in the `server` directory with:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

**For MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/myapp`
- Replace `MONGODB_URI` with your connection string

**For Local MongoDB:**
- Install MongoDB: https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use: `mongodb://localhost:27017/myapp`

### 4. Start the server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## React Native App Setup

### 1. Update API URL (if needed)

If testing on a physical device or Android emulator, update the API URL in:
`app/utils/api.js`

- **iOS Simulator**: `http://localhost:3000/api` ✅
- **Android Emulator**: `http://10.0.2.2:3000/api`
- **Physical Device**: `http://YOUR_COMPUTER_IP:3000/api`

To find your IP:
- macOS/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig`

### 2. Start the React Native app
```bash
# From the root directory (my-app)
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code for physical device

## Testing the Flow

1. **Start MongoDB** (if using local)
2. **Start the Express server** (`cd server && npm run dev`)
3. **Start the React Native app** (`npm start`)
4. **Test Signup**: Create a new account
5. **Test Login**: Login with your credentials
6. **Verify**: You should be redirected to the home screen

## API Endpoints

- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 3000 is available

### App can't connect to server
- Verify server is running
- Check API URL in `app/utils/api.js`
- For physical devices, ensure phone and computer are on same network
- Check firewall settings

### Authentication errors
- Verify JWT_SECRET is set in `.env`
- Check MongoDB connection
- Verify user exists in database

