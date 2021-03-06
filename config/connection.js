
//  Set up MySQL connection
const mysql = require('mysql');
let connection = '';
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(JAWSDB_URL);
} else {
    const connection = mysql.createConnection({
      port: 3306,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'burgers_db'
  });
}

//  Make connection
connection.connect( err => {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId);
});

//  Export connection for our ORM to use
module.exports = connection;
