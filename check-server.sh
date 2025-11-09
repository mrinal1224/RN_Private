#!/bin/bash

echo "=== Server Connection Check ==="
echo ""

# Check if server is running on port 3000
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "✅ Server is running on port 3000"
    PID=$(lsof -ti:3000)
    echo "   Process ID: $PID"
else
    echo "❌ No server found on port 3000"
    echo "   Start server with: cd server && npm run dev"
fi

echo ""

# Test server health endpoint
echo "Testing server health endpoint..."
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Server is responding to requests"
    curl -s http://localhost:3000/api/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:3000/api/health
else
    echo "❌ Server is not responding"
    echo "   Make sure server is running: cd server && npm run dev"
fi

echo ""
echo "=== Platform-specific URLs ==="
echo "iOS Simulator: http://localhost:3000/api"
echo "Android Emulator: http://10.0.2.2:3000/api"
echo "Physical Device: http://YOUR_IP_ADDRESS:3000/api"
echo ""
echo "To find your IP address:"
echo "  macOS/Linux: ifconfig | grep 'inet '"
echo "  Windows: ipconfig"

