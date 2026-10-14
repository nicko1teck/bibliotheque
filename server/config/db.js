// Database connection settings. Values come from environment variables.
// For local development they can be placed in server/.env (see .env.example).
require('./load-env');

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const envNames = { host: 'DB_HOST', user: 'DB_USER', password: 'DB_PASSWORD', database: 'DB_NAME' };
const missing = Object.keys(envNames).filter(key => !db[key]).map(key => envNames[key]);
if (missing.length > 0) {
    throw new Error('Missing required environment variable(s): ' + missing.join(', '));
}

module.exports = db;
