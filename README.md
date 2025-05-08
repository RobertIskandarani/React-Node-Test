# React & Node.js Skill Test

## Estimated Time

- 60 min

## Requirements

- Bug fix to login without any issues (20min) <br/>
  There is no need to change or add login function.
  Interpret the code structure and set the correct environment by the experience of building projects. <br/>
  Here is a login information. <br/>
  ✓ email: admin@gmail.com ✓ password: admin123

  Spended time: 30 mins
  
  Steps to fix:

  - create an .env file with:
    REACT_APP_BASE_URL="url where the back is hosted"
  - create an .env file with
    DB_URL="url to my cluster in mongo"
    DB="if there are a db that you want to use"

- Implement Restful API of "Meeting" in the both of server and client sides (40min)<br/>
  Focus Code Style and Code Optimization. <br/>
  Reference other functions.

  Spended time: 1 hour

  It took me an hour to complete the second step because I focused on doing TDD + DDD as well as I could and being able to loop through the following until I finished:

  1. Add a failing test

  2. Fix the test

  3. Check that it works well with the frontend, and if not, fix it

  4. Refactor
