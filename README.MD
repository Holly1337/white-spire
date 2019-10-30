# WHITE SPIRE

### Recommended Requirements
Tested on Node.js (v10) and npm (v6)

### Installation
- Setup a database that is compatible with [sequelize](https://sequelize.org/)
- Create a `.env` file in the `express-server` directory
  - add the DataBase credentials
  - ad a `PORT` for your web server. 80 should be fine
- Execute `npm install` in `app` and `express-server`
- run `node_modules/.bin/sequelize db:migrate` or `npx sequelize-cli db:migrate` inside of the `express-server` to create your database tables
- create cronjob to execute `node express-server/scripts/loadLeaderboardData.js` every hour
- build the app by running `npm run build` inside the `app` folder
- copy the `app/build` folder to `express-server/build`
- run `npm start` inside the `express-erver` folder

The leaderboard can now be reached at your configured port

### Tech Stack

The data gets fetched by a simple JavaScript Script that is executed every hour.
It scrapes https://underlords.com/leaderboard and writes the result into the database.

The frontend is a ReactJS app that is deployed by an express server which uses sequelize for easy db access.

## API
API is reachable under '/api/v1/:endpoint'

### Endpoints
#### Leaderboard
`/leaderboard` - Returns the leaderboard for the latest timestamp. Ordered by position.

**Parameters**:

- `limit`
	- format: number
	- description: Returns all entries for the latest `x` timestamps. Ordered by timestamp descending
	- example: `/leaderboard?limit=x`

```json
// example response for '/leaderbaord'
[
  {
    "id": 135,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15142,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  },
  {
    "id": 136,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player2",
    "position": 2,
    "score": 15085,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  }
]
```

#### Player
`/player/:name` - Returns all entries for a single player up to 1 year back. Also returns the total count. Ordered by timestamp descending.

```json
// example response for '/player/Player1'
{
  "count": 2,
  "rows": [
    {
      "id": 139,
      "timestamp": "2019-10-30T14:15:03.000Z",
      "playername": "Player1",
      "position": 5,
      "score": 15043,
      "createdAt": "2019-10-30T14:15:03.000Z",
      "updatedAt": "2019-10-30T14:15:03.000Z"
    },
    {
      "id": 131,
      "timestamp": "2019-10-30T13:15:04.000Z",
      "playername": "Player1",
      "position": 7,
      "score": 15043,
      "createdAt": "2019-10-30T13:15:04.000Z",
      "updatedAt": "2019-10-30T13:15:04.000Z"
    }
  ]
}
```



#### Position
`/position/:position` - Returns all entries for a specified leaderboard position up to 1 year back. Ordered by timestamp descending.

```json
// example response for '/psition/1'
[
  {
    "id": 135,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15142,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  },
  {
    "id": 125,
    "timestamp": "2019-10-30T13:15:04.000Z",
    "playername": "Player2",
    "position": 1,
    "score": 15114,
    "createdAt": "2019-10-30T13:15:04.000Z",
    "updatedAt": "2019-10-30T13:15:04.000Z"
  }
]
```

## TODO
- automatically generate docs for api
