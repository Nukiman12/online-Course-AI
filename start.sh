#!/bin/bash

echo "========================================"
echo " EduAI - AI-powered Learning Platform"
echo "========================================"
echo ""

echo "[1/3] Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed!"
    exit 1
fi
python3 --version

echo ""
echo "[2/3] Starting Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt -q

echo "Initializing database..."
python3 init_db.py

echo ""
echo "Starting FastAPI server..."
osascript -e 'tell app "Terminal" to do script "cd '"$PWD"' && source venv/bin/activate && python3 main.py"' &

cd ..

echo ""
echo "[3/3] Starting Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
fi

echo "Starting Vite dev server..."
osascript -e 'tell app "Terminal" to do script "cd '"$PWD"' && npm run dev"' &

cd ..

echo ""
echo "========================================"
echo " EduAI is starting!"
echo "========================================"
echo ""
echo " Backend:  http://localhost:8000"
echo " Frontend: http://localhost:5173"
echo " API Docs: http://localhost:8000/docs"
echo ""
echo " Opening browser in 5 seconds..."
sleep 5

if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
elif command -v open &> /dev/null; then
    open http://localhost:5173
fi

echo ""
echo " To stop the servers, close the terminal windows."
echo ""


