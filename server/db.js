const sqlite3 = require('sqlite3').verbose();

// Create database schema if it doesn't exist
const db = new sqlite3.Database('./cyber_assets.db');
db.run('CREATE TABLE IF NOT EXISTS cyber_assets (id INTEGER PRIMARY KEY, name TEXT, type TEXT, serial_number TEXT, operating_system TEXT, created_at TEXT, updated_at TEXT)', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Database schema created (or already exists)');
    }
});

// Function to execute SQL queries
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = executeQuery;