import Auth from '@/components/Auth/Auth';
import Chat from '@/components/Chat/Chat';
import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session?.user);
  const reloadSession = () => {};

  return (
    <Box>
      {session?.user.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}

export default Home;
