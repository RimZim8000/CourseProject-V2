rename-item –path .\build\static\js\main*.*.js –newname  main.js
ren .\build\static\js\main*.*.js.map   main.js.map
ren .\build\static\css\main.*.css main.css
ren .\build\static\css\main.*.css.map main.css.map
Copy-Item -Path .\build\ -Destination ..\CourseProject2018\wwwroot\ -recurse -Force



##get-childitem -path .\build *.*.js -recurse | move-item -destination c:usersrusselldesktop

Get-ChildItem -path .\build *.*.js | Rename-Item -NewName { $_.Name -replace '\main.*.js','main.js' }

