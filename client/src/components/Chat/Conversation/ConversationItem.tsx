import { Stack, Text } from '@chakra-ui/react';
import { ConversationsPopulated } from '../../../../../server/src/util/types';

interface ConversationItemProps {
  conversation: ConversationsPopulated;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: 'whiteAlpha.200' }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;