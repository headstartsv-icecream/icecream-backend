import { createConnection } from 'mysql'

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'app',
})

export default connection
