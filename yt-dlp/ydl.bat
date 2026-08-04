@echo off
setlocal enabledelayedexpansion

set CONFIG_DIR=%APPDATA%\yt-dlp

:: If no arguments, show usage
if "%~1"=="" goto usage

:: Check if first argument looks like a URL (contains "://")
echo %~1 | findstr /C:"://" >nul
if %errorlevel%==0 (
    yt-dlp --config-location "%CONFIG_DIR%\config" %*
    goto end
)

:: First argument is a profile name
set PROFILE=%~1
set CONFIG_FILE=%CONFIG_DIR%\config.%PROFILE%

:: Check the profile config file exists
if not exist "%CONFIG_FILE%" (
    echo [ERROR] Profile "%PROFILE%" not found.
    echo         Expected: %CONFIG_FILE%
    echo.
    echo Available profiles:
    for %%f in (%CONFIG_DIR%\config.*) do echo   %%~nxf
    goto end
)

:: Strip the profile name from the front of the full command line args
:: %* always contains everything, so we rebuild by skipping the first token
set FULLARGS=%*
set FIRSTARG=%~1

:: Remove the first argument from the full args string
call set ARGS=%%FULLARGS:*%FIRSTARG%=%%

yt-dlp --config-location "%CONFIG_FILE%" %ARGS%

goto end

:usage
echo Usage:
echo   ydl [profile] ^<URL^> [yt-dlp options]
echo.
echo Examples:
echo   ydl music ^<URL^>        -- use config.music
echo   ydl ^<URL^>              -- use default config
echo.
echo Available profiles:
for %%f in (%CONFIG_DIR%\config.*) do echo   %%~nxf

:end
endlocal
