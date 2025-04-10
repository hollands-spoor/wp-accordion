
@echo off
if exist deploy (
rem    rmdir /s /q deploy
)
mkdir deploy
xcopy good-accordion.php ..\..\..\..\deploy\good-accordion\trunk /I /Y
xcopy license ..\..\..\..\deploy\good-accordion\trunk /I /Y
xcopy readme.txt ..\..\..\..\deploy\good-accordion\trunk /I /Y
xcopy build ..\..\..\..\deploy\good-accordion\trunk\build\* /e/y
xcopy languages ..\..\..\..\deploy\good-accordion\trunk\languages\* /e/y
xcopy assets ..\..\..\..\deploy\good-accordion\assets\* /e/y
rem cd deploy
rem 7z a good-accordion.zip

