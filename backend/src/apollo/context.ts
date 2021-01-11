import { ApolloServerExpressConfig } from 'apollo-server-express'

const users = [
  {
    id: '1',
    email: 'asdf@asdf.com',
    token: 'adslkfjweri32r32',
  },
  {
    id: '2',
    email: 'asdfasdf@asdf.com',
    token: '1231231i32r32',
  },
]

const context: ApolloServerExpressConfig['context'] = ({ req }) => {
  const token = req.headers.authorization || ''

  // 로그인되어 있지 않거나 로그인 토큰이 없을 때
  if (token.length !== 64) return { user: null }

  const user = users.find((user) => user.token === token)
  return { user }
}

export default context
