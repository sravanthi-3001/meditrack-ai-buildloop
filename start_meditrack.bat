@echo off
title MediTrack AI - Personal Health Copilot
echo ========================================================
echo  MediTrack AI - Personal Health Copilot (Altrix Labs)
echo ========================================================
echo Starting development server on port 8080...
start "" "http://localhost:8080"
"%LOCALAPPDATA%\Programs\Python\Python313\python.exe" -m http.server 8080
if %ERRORLEVEL% NEQ 0 (
    python -m http.server 8080
)
pause
