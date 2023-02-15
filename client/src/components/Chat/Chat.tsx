import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React from 'react';

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div>Chat
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Chat;
