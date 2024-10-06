const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cfgywa8iewua.us-east-2.rds.amazonaws.com',
  database: 'designDB',
  password: 'PostPass01.',
  port: 5432,
})

module.exports = pool;
