@echo off
REM Elevating Nations - Startup Script for Windows

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Elevating Nations CIC - Website                  ║
echo ║  Starting Backend Server...                       ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ ERROR: Node.js is not installed!
  echo Please download Node.js from: https://nodejs.org
  pause
  exit /b 1
)

REM Navigate to backend directory and start server
cd backend
npm start

REM The above command will keep running. To stop, press Ctrl+C
