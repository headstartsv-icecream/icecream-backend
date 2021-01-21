import connection from './config/config'

connection.connect()

connection.query('select * from users;', (err: Error, rows: any, cols: any) => {
  if (err) {
    throw err
  }
  console.log('user info : ', rows)
})

connection.end()
