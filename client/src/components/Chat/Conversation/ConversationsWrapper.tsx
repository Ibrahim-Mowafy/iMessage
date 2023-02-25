import ConversationOperations from '@/graphql/operations/conversation';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import ConversationList from './ConversationList';
import { ConversationData } from '@/util/types';
import { ConversationsPopulated } from '../../../../../server/src/util/types';
import { useEffect } from 'react';

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    subscribeToMore,
  } = useQuery<ConversationData, null>(
    ConversationOperations.Queries.conversations
  );

  console.log('Query data', conversationData);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationsPopulated
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  /**
   * Execute subscription on mount
   */
  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      width={{
        base: '100%',
        md: '400px',
      }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      {/* Skeleton Loader */}
      <ConversationList
        session={session}
        conversations={conversationData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
