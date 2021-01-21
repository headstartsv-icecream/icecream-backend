import { createConnection } from 'mysql'

const conn = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'my_db',
})

export default conn
