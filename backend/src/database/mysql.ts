import dotenv from 'dotenv'
import { createConnection } from 'mysql'

dotenv.config()

export const connection = createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
})

export function connectMySql() {
  connection.connect(() => {
    console.log('Connected to MySQL')
  })

  connection.query('select * from comment;', (err:Error, rows:any, cols:any) => {
        console.log(rows)
})
}

export function disconnectMySql() {
  connection.end(() => {
    console.log('Disconnected to MySQL')
  })
}
