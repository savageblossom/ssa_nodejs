const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'Gam1ng',
    port: 5432,
})

const query = (text, params) => pool.query(text, params);

export default query;