/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { server } from './apollo/server'
// import { connectPostgres } from './postgres/client'

// connectPostgres()

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
