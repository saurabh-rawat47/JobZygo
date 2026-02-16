@echo off
echo Setting MONGODB_URI...
set MONGODB_URI=mongodb+srv://hhuhaahh:wJXuO3licKHhXSlC@tony.wytutok.mongodb.net/?retryWrites=true^&w=majority^&appName=tony

echo MONGODB_URI has been set.
echo Starting JobZygo Application...
call mvn spring-boot:run
pause
