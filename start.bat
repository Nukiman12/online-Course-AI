@echo off
echo ========================================
echo  EduAI - AI-powered Learning Platform
echo ========================================
echo.

echo [1/3] Checking Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    pause
    exit /b 1
)

echo.
echo [2/3] Starting Backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt -q

echo Initializing database...
python init_db.py

echo.
echo Starting FastAPI server...
start cmd /k "cd /d %cd% && venv\Scripts\activate && python main.py"

cd ..

echo.
echo [3/3] Starting Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
)

echo Starting Vite dev server...
start cmd /k "cd /d %cd% && npm run dev"

cd ..

echo.
echo ========================================
echo  EduAI is starting!
echo ========================================
echo.
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173
echo  API Docs: http://localhost:8000/docs
echo.
echo  Press any key to open the app in browser...
pause > nul

start http://localhost:5173

echo.
echo  To stop the servers, close the terminal windows.
echo.
pause


