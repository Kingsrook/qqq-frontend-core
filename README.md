# qqq-frontend-core
This is the core typescript/javascript library, which knows how to interact with a qqq backend http server.  It also defines qqq models (e.g., the IO objects for the http interactions).  

It is not tied to any particular javascript frontend library/framework, nor is it even web-specific (e.g., should be usable within a NodeJS implementation). 

## Setup for Development 
1. run target `clean-install-modules` after cloning
2. run target `build` to compile and create deployable packages 
3. run target `test` to run the jest test suite 

## Testing
The Jest Target Profiles should be working, allowing you to open a testing file and run or dedug any of the tests directly.  

This system should also allow you to track coverage and engage with the coverage tools in real-time
