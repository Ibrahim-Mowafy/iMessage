import { Box, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ConversationsPopulated } from '../../../../../server/src/util/types';
import ConversationItem from './ConversationItem';
import ConversationModal from './Modal/Modal';

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationsPopulated>;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const {
    user: { id: userId },
  } = session;
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {conversations?.map((conversation) => (
        <ConversationItem
          conversation={conversation}
          key={conversation.id}
          onClick={() => onViewConversation(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
          userId={userId}
          
        />
      ))}
    </Box>
  );
};

export default ConversationList;
