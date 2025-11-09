# Troubleshooting Network Issues

## Common Signup/Login Network Errors

### 1. "Cannot connect to server" Error

**Possible causes:**
- Server is not running
- Wrong API URL for your platform
- Firewall blocking the connection

**Solutions:**
1. **Check if server is running:**
   ```bash
   cd server
   npm run dev
   ```
   You should see: `Server running on port 3000`

2. **Verify API URL based on your platform:**
   - **iOS Simulator**: `http://localhost:3000/api` ✅
   - **Android Emulator**: `http://10.0.2.2:3000/api` ✅
   - **Physical Device**: `http://YOUR_COMPUTER_IP:3000/api`
     - Find your IP: `ifconfig` (macOS/Linux) or `ipconfig` (Windows)
     - Update `app/utils/api.ts` with your IP

3. **Test server directly:**
   ```bash
   curl http://localhost:3000/api/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

### 2. "Network request failed" Error

**Possible causes:**
- Server not accessible from device/emulator
- CORS issues
- Network connectivity

**Solutions:**
1. **For Android Emulator:**
   - Make sure you're using `http://10.0.2.2:3000/api` (not localhost)
   - Check that server is running

2. **For Physical Device:**
   - Device and computer must be on same WiFi network
   - Use your computer's local IP address (not localhost)
   - Check firewall settings

3. **Check server logs:**
   - Look at server console for incoming requests
   - If no requests appear, the URL is wrong

### 3. "Invalid JSON response" Error

**Possible causes:**
- Server returning error HTML instead of JSON
- Server crashed or not responding properly

**Solutions:**
1. Check server console for errors
2. Verify MongoDB is running and connected
3. Check `.env` file has correct values

### 4. "User already exists" Error

This is normal - the email is already registered. Try logging in instead.

### 5. Debug Steps

1. **Check console logs:**
   - Open React Native debugger or Metro bundler console
   - Look for "Making request to:" logs
   - Check "Response status:" and "Response text:" logs

2. **Test API manually:**
   ```bash
   # Test signup
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Verify MongoDB:**
   ```bash
   # Check if MongoDB is running
   mongosh
   # Or for older versions
   mongo
   ```

### Quick Fix Checklist

- [ ] Server is running (`cd server && npm run dev`)
- [ ] MongoDB is running and connected
- [ ] `.env` file exists in `server/` directory
- [ ] API URL matches your platform (check `app/utils/api.ts`)
- [ ] Device/emulator and computer on same network (for physical devices)
- [ ] Check console logs for detailed error messages

### Still Having Issues?

1. Check the React Native console for detailed error logs
2. Check the server console for incoming requests
3. Verify the API URL in `app/utils/api.ts` matches your setup
4. Try testing the API endpoint directly with curl or Postman

