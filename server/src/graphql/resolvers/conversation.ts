import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { GraphQLContext } from './../../util/types';

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantsIds: Array<string> },
      context: GraphQLContext
    ) => {
      const { session, prisma } = context;
      const { participantsIds } = args;

      if (!session?.user) {
        throw new ApolloError('Not authorized');
      }
      const {
        user: { id: userId },
      } = session;
      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: {
            participants: {
              include: {
                user: {
                  select: { id: true, username: true },
                },
              },
            },
            latestMessage: {
              include: {
                sender: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.log('createConversation', error);
        throw new ApolloError('Error creating conversation');
      }
    },
  },
};

export default resolvers;
