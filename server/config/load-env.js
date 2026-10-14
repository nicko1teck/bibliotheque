// Loads KEY=VALUE pairs from server/.env into process.env, for local development.
//
// - Does nothing if server/.env does not exist (for example in production, where
//   real environment variables are used instead).
// - Never overwrites a variable that is already set in the real environment.
// - Has no dependencies.
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '.env');

if (fs.existsSync(envFile)) {
    fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach(function (line) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (!match) return;

        let value = match[2];
        const quoted = (value.startsWith('"') && value.endsWith('"')) ||
                       (value.startsWith("'") && value.endsWith("'"));
        if (quoted && value.length >= 2) value = value.slice(1, -1);

        if (process.env[match[1]] === undefined) {
            process.env[match[1]] = value;
        }
    });
}
