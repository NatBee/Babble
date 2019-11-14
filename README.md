## Babblebox is a chat app built with:
- ReactJS front end
- NodeJS and Express back end
- Socket.io
- PostgreSQL database
- Knex

### To get started:
- clone repository
- cd into babblebox directory
- [npm install](#npm-install)

### Build the database:
- cd .. (main project folder)
- npm install -g knex
- npm install knex pg --save
- npm nodemon --save-dev
- psql
- CREATE DATABASE babblebox
- \q
- [knex migrate:latest](#knex migrate:latest)

### To start the App:  
- [npm run dev](#npm-run-dev)
    - this starts both the react and express servers
    - Open [http://localhost:3000](http://localhost:3000) to view in the browser.
    - start chatting
 