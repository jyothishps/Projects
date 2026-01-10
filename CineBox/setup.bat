@echo off
echo ========================================
echo CineBox Login System - Automated Setup
echo ========================================
echo.

echo Step 1: Initializing Database...
node server/initDb.js
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Database initialization failed!
    echo Check if MySQL is running and database 'cinebox' exists
    pause
    exit /b 1
)
echo Database initialized successfully!
echo.

echo Step 2: Testing Backend Server...
echo Starting server for 5 seconds to test...
start /B node server/index.js
timeout /t 5 /nobreak >nul
taskkill /F /IM node.exe /T >nul 2>&1

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start backend:  node server/index.js
echo 2. Start frontend: npm run dev
echo 3. Open browser:   http://localhost:5173
echo.
pause
