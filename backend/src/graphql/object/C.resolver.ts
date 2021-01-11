import { DateTimeResolver } from 'graphql-scalars'
import { CResolvers } from 'src/graphql/generated/graphql'

export const C: CResolvers = {
  name: (c) => {
    return `${c.name}`
  },
}

export const DateTime = DateTimeResolver
