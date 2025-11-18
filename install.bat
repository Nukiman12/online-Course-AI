@echo off
echo ========================================
echo  EduAI Installation Script
echo ========================================
echo.

echo [1/4] Checking requirements...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [2/4] Setting up Backend...
cd backend

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo Initializing database with test data...
python init_db.py

cd ..

echo.
echo [3/4] Setting up Frontend...
cd frontend

echo Installing npm dependencies...
call npm install

cd ..

echo.
echo [4/4] Final setup...
echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo IMPORTANT: Configure your OpenAI API key
echo 1. Open backend/.env file
echo 2. Replace OPENAI_API_KEY with your actual key
echo 3. Get your key from https://platform.openai.com/api-keys
echo.
echo To start the application:
echo  - Run: start.bat
echo  - Or manually start backend and frontend
echo.
echo Test accounts:
echo  - Student: student / password
echo  - Teacher: teacher / password
echo.
pause


