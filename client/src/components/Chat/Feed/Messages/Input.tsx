import MessageOperations from '@/graphql/operations/message';
import { useMutation } from '@apollo/client';
import { Box, Input } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useState } from 'react';
import { ObjectID } from 'bson';
import { toast } from 'react-hot-toast';
// import { SendMessageArguments } from '../../../../../../server/src/util/types';
import { MessagesData, SendMessageArguments } from '@/util/types';

interface MessageInputProps {
  session: Session;
  conversationId: string;
}
const MessageInput: React.FC<MessageInputProps> = ({
  conversationId,
  session,
}) => {
  const [messageBody, setMessageBody] = useState('');

  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutations.sendMessage);

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // call send message
      const { id: senderId } = session.user;
      const messageId = new ObjectID().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };
      const { data, errors } = await sendMessage({
        variables: { ...newMessage },
        /**
         * Optimistically update UI
         */
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          setMessageBody('');
          const existing = cache.readQuery<MessagesData>({
            query: MessageOperations.Query.messages,
            variables: {
              conversationId,
            },
          }) as MessagesData;
          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessageOperations.Query.messages,
            variables: {
              conversationId,
            },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId: session.user.id,
                  conversationId,
                  sender: {
                    id: session.user.id,
                    username: session.user.username,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.log('onSendMessage error', error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          placeholder="Type a message"
          size="md"
          resize="none"
          _focus={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'whiteAlpha.300',
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
