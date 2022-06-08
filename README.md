# qqq-frontend-core
This is the core typescript/javascript library, which knows how to interact with a qqq backend http server.  It also defines qqq models (e.g., the IO objects for the http interactions).  

It is not tied to any particular javascript frontend library/framework, nor is it even web-specific (e.g., should be usable within a NodeJS implementation). 

## Setup for Development 
1. run target `clean-install-modules` after cloning
2. run target `build` to compile and create deployable packages 
3. run target `test` to run the jest test suite 

## Testing
The Jest Target Profiles should be working, allowing you to open a testing file and run or debug any of the tests directly.  

This system should also allow you to track coverage and engage with the coverage tools in real-time

## License
QQQ - Low-code Application Framework for Engineers. \
Copyright (C) 2022.  Kingsrook, LLC \
651 N Broad St Ste 205 # 6917 | Middletown DE 19709 | United States \
contact@kingsrook.com
https://github.com/Kingsrook/

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
