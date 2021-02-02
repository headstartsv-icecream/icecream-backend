/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import ON_DEATH from 'death'
import { server } from './apollo/server'
import { connectMySql, connection, disconnectMySql } from './database/mysql'

connectMySql()

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

ON_DEATH(() => {
  try {
    disconnectMySql()
  } catch (err) {
    console.error(err)
  }
})
