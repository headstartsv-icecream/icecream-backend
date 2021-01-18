import { createConnection } from 'mysql'
import conn from './config/config'

conn.connect()

conn.query('select * from users;', (err: Error, rows: any, cols: any) => {
  if (err) {
    throw err
  }
  console.log('user info : ', rows)
})

conn.end()
