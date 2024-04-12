const mysql = require('mysql2/promise');
require("dotenv").config()

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

console.log('Banco conectado.')

module.exports = pool;

