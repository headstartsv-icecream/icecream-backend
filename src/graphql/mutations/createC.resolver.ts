import { MutationResolvers } from 'src/graphql/generated/graphql'
// import { client } from '../../postgres/client'

// const sql = 'insert into c (name, age) values ($1, $2) returning *'

export const Mutation: MutationResolvers = {
  createC: (_, { input }) => {
    // const res = await client.query(sql, [input.name, input.age])

    // return res.rows[0]

    console.log(input)
    return {
      id: '1',
      creationDate: new Date(),
      name: 'namename',
      age: 23,
    }
  },
}
