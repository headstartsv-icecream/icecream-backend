const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'my_db',
})

conn.connect()

conn.query('select * from users;', (err: Error, rows: any, cols: any) => {
  if (err) {
    throw err
  }
  console.log('user info : ', rows)
})

conn.end()
