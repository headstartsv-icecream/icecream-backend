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
  connection.connect()
}

export function disconnectMySql() {
  connection.end()
}
