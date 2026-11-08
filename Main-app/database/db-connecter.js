const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST || '127.0.0.1',
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,  
    database        : process.env.DB_NAME || 'movies',
    decimalNumbers   :  true,      
})

module.exports.pool = pool;
