// PM2 process file for running the server in production (EC2).
//
// 1. Copy this file to "ecosystem.config.js" ON THE SERVER (it is git-ignored).
// 2. Replace every placeholder with a real value.
// 3. Start the server from the server/ folder:  pm2 start ecosystem.config.js
//
// In production the app reads these as real environment variables.
module.exports = {
  apps: [
    {
      name: 'bibliotheque-server',
      script: 'bin/www',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 4000, // pick a port no other app on the server uses
        DB_HOST: 'your_db_server_private_ip',
        DB_USER: 'your_db_user',
        DB_PASSWORD: 'your_db_password',
        DB_NAME: 'your_database_name',
        CORS_ORIGIN: 'https://your-client-address', // the address the React site is served from
      },
    },
  ],
};
