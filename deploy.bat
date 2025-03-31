
@echo off
if exist deploy (
    rmdir /s /q deploy
)
mkdir deploy
xcopy good-accordion.php deploy /I /Y
xcopy license deploy /I /Y
xcopy readme.txt deploy /I /Y
xcopy build deploy\build\* /e/y
xcopy languages deploy\languages\* /e/y
cd deploy
7z a good-accordion.zip

