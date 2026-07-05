@echo off
REM Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs

REM Start Frontend
echo Starting Frontend Server on http://localhost:3000...
start cmd /k "cd /d C:\Users\Pc\Desktop\ecommerce-app\frontend && node server.js"

REM Wait a few seconds
timeout /t 3 /nobreak

REM Start Backend
echo Starting Backend Server on http://localhost:5000...
start cmd /k "cd /d C:\Users\Pc\Desktop\ecommerce-app && npm run dev"

REM Wait and open browser
timeout /t 3 /nobreak
start http://localhost:3000

echo.
echo ============================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo ============================================
echo.
echo Both servers are starting...
pause
