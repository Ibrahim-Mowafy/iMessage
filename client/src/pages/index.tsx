import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();
  console.log('🚀 ~ file: index.tsx:6 ~ data', data);

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in </button>
      <button onClick={() => signOut()}>Sign out </button>
    </div>
  );
};

export default Home;
