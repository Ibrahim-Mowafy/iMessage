import { GraphQLContext } from './../../util/types';
const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ) => {
      const { username } = args;
      const { session, prisma } = context;

      console.log('🚀 ~ file: user.ts:8 ~ username', username);
      console.log('🚀 ~ file: user.ts:12 ~ context', context);
    },
  },
};

export default resolvers;
