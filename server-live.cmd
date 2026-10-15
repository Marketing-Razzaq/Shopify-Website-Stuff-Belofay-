@echo off
setlocal
if /I "%~1"=="--red" (
  powershell.exe -NoProfile -File "%~dp0server-live.ps1" -Red
) else (
  powershell.exe -NoProfile -File "%~dp0server-live.ps1"
)
