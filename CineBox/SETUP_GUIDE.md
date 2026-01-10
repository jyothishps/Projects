# CineBox Login System - Setup Guide

## Quick Start (3 Steps)

### 1. Initialize Database
```bash
node server/initDb.js
```
**Expected Output**: "Users table created or already exists."

### 2. Start Backend Server (Keep this terminal running)
```bash
node server/index.js
```
**Expected Output**: 
- "Connected to MySQL database"
- "Server is running on port 5000"

### 3. Start Frontend (New terminal, keep running)
```bash
npm run dev
```
**Expected Output**: Server running at `http://localhost:5173`

## Testing the Flow

1. **Open Browser**: Go to `http://localhost:5173`
   - Should auto-redirect to `/login`

2. **Register New User**:
   - Click "Sign Up"
   - Fill in: Username, Email, Password
   - Click "Register" → Redirects to login page

3. **Login**:
   - Enter your email and password
   - Click "Login" → Redirects to `/home` (main app)
   - NavBar shows: "Hi, [username]" and "Logout"

4. **Test Protection**:
   - Logout → Redirected back to login
   - Try visiting `/home` without login → Auto-redirected to `/login`

## Troubleshooting

### Error: "Cannot connect to MySQL"
- Ensure MySQL server is running
- Check credentials in `server/db.js`:
  - Default: `root` / no password / database `cinebox`
  
### Error: "react-router-dom not found"
- Run: `npm install`
- Wait for completion

### Error: Port 5000 in use
- Change port in `server/index.js`:
  ```javascript
  const PORT = process.env.PORT || 5001; // Use 5001 instead
  ```
- Update frontend API calls in `src/context/AuthContext.jsx`:
  ```javascript
  'http://localhost:5001/api/auth/...'
  ```

### Backend not responding
1. Check backend terminal for errors
2. Restart: `Ctrl+C` then `node server/index.js`
3. Test endpoint: Visit `http://localhost:5000` in browser
   - Should show: "CineBox API is running"
