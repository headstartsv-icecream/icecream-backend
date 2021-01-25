import connection from './config/config'

connection.connect()

connection.query('select * from comment;', (err: Error, rows: any, cols: any) => {
  if (err) {
    throw err
  }
  console.log('user comments : ', rows)
})

connection.end()
