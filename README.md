# Bibliotheque

A small book-collection app: a React front end and a Node/Express API backed by MySQL. Users can list, add, edit, and delete books.

```
client/   React app (Create React App)
server/   Express API (MySQL, port 4000 by default)
```

## Configuration

Credentials and addresses are **not** stored in the code. Copy the example files and fill in real values for local development. Both real files are git-ignored.

**Server** (`server/.env`, see `server/.env.example`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `DB_HOST` | Yes | MySQL host |
| `DB_USER` | Yes | MySQL user |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_NAME` | Yes | MySQL database name |
| `PORT` | No | Port to listen on (default `4000`) |
| `CORS_ORIGIN` | No | Comma-separated origins allowed to call the API. If unset, any origin is allowed. |

The server will not start if a required database variable is missing.

**Client** (`client/.env`, see `client/.env.example`):

| Variable | Purpose |
| --- | --- |
| `REACT_APP_SERVER_URL` | Full URL of the server's books endpoint, for example `http://localhost:4000/books` |

React bakes this value into the built JavaScript, so never put secrets in it.

## Database

The API expects a MySQL table named `books`. There is no schema script in this repository, so create the table to match the fields the client sends (see `client/src/Book.js`).

## Run locally

Start the server:

```
cd server
npm install
copy .env.example .env      (macOS/Linux: cp .env.example .env)
npm start
```

Then, in a second terminal, start the client:

```
cd client
npm install
copy .env.example .env      (macOS/Linux: cp .env.example .env)
npm start
```

Open http://localhost:3000.

## Deploy (EC2)

**Server:** on the server, copy `server/ecosystem.config.example.js` to `server/ecosystem.config.js`, fill in the real values, run `npm install --omit=dev` in `server/`, then start it with `pm2 start ecosystem.config.js`.

**Client:** the client is a static site. Build it with the server's public address baked in, then serve the `client/build` folder (for example with Nginx):

```
cd client
npm install
REACT_APP_SERVER_URL=https://your-server-address/books npm run build
```

(On Windows PowerShell: `$env:REACT_APP_SERVER_URL="https://your-server-address/books"; npm run build`)

`client/static.json` is configuration for Heroku's static buildpack and is not used on EC2.

### Build note: Node version

This client uses `react-scripts` 4, which is built on webpack 4. On Node 17 or newer the build can fail with `ERR_OSSL_EVP_UNSUPPORTED`. If that happens, either use Node 16, or set `NODE_OPTIONS=--openssl-legacy-provider` before running the build.

## Notes

- Never commit `server/.env`, `client/.env`, or `ecosystem.config.js`. All are git-ignored.
- The API has no authentication: anyone who can reach it can add, change, or delete books.
