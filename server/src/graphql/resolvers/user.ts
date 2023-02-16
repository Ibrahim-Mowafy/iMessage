const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
      const { username } = args;

      console.log('🚀 ~ file: user.ts:8 ~ username', username);
      console.log('🚀 ~ file: user.ts:12 ~ context', context);
    },
  },
};

export default resolvers;
