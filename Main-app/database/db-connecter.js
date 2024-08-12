var mysql = require('mysql2')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'root',
    password        : 'GKirby68!',  
    database        : 'movies',
    decimalNumbers   :  true,      
})

module.exports.pool = pool;