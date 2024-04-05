const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senai@604',
  database: 'movies',

});

console.log('Banco conectado.')

module.exports = pool;

