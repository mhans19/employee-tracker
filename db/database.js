// DEPENDENCIES
const mysql = require('mysql2');
// CONNECT TO DATABASE
const connection = mysql.createConnection({
    hot: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Romy2020!',
    database: 'employees_db'
  });
//   connection.connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
// });
// EXPORT MODULE
module.exports = connection;