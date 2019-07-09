## WHITE SPIRE

### Recommended Requirements
Nodejs (v10) and npm (v6)

### Installation
- Execute `npm install` in `backend`, `database` and `app`
- rename `inital_db.json` to `db.json` in the database folder
- start database with `npm run start` inside the `database` folder
- create cronjob to execute `node scraper/loadLeaderboardData.js` every hour
- build the app by running `npm run build` inside the `app` folder
- copy the `app/build` folder to `backend/build` and run `node index.js` inside the `backend` folder

The leaderboard can now be reached at port 80
