// DEPENDENCIES
const mysql = require('mysql2');
// CONNECT TO DATABASE
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Romy2020!',
    database: 'employees_db'
  });
  connection.connect(err => {
    if (err) throw err;
});
// EXPORT MODULE
module.exports = connection;