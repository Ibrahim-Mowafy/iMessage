import { gql } from '@apollo/client';
export default {
  Queries: {},
  Mutation: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscription: {},
};
