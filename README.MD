# WHITE SPIRE

### Recommended Requirements
Tested on Node.js (v10) and npm (v6)

### Installation
- Setup a database that is compatible with [sequelize](https://sequelize.org/)
- Create a `.env` file in the `express-server` directory
  - add the DataBase credentials
  - ad a `PORT` for your web server. 80 should be fine
- Execute `npm install` in `app` and `express-server`
- run `node_modules/.bin/sequelize init` inside of the `express-server` to create your database tables
- create cronjob to execute `node express-server/scripts/loadLeaderboardData.js` every hour
- build the app by running `npm run build` inside the `app` folder
- copy the `app/build` folder to `express-server/build`
- run `npm start` inside the `express-erver` folder

The leaderboard can now be reached at your configured port

### Tech Stack

The data gets fetched by a simple JavaScript Script that is executed every hour.
It scrapes https://underlords.com/leaderboard and writes the result into the database.

The frontend is a ReactJS app that is deployed by an express server which uses sequelize for easy db access.

## TODO
- generate swagger docs for api
