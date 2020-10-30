const pg = require('pg');

// Setup PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000 
});

pool.on('connect', () => {
    console.log("pool connected to postgresql");
} );

pool.on('error', (error) => {
    console.log("error on pool", error);
});

module.exports = pool;