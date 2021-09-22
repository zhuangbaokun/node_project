const {Pool} = require('pg');
const {user, host, database, password, port} = require('../monster_api/secrets')

const pool = new Pool({
    user, host, database, password, port
});

pool.query('SELECT * FROM monsteres', (err, res) => {
    if (err) return console.log(err);

    console.log(res);
})