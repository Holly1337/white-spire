## WHITE SPIRE

### Recommended Requirements
Nodejs (v10) and npm (v6)

### Installation
- Execute `npm install` in `backend`, `database` and `app`
- start database with `npm run start` inside the `database` folder
- create cronjob to execute `node scraper/loadLeaderboardData.js` every hour
- build the app by running `npm run build` inside the `app` folder
- integrate the built app into the backend and run `node index.js` inside the `backend` folder

The leaderboard can now be reached at port 80
