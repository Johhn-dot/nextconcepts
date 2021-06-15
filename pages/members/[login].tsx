import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface MemberProps {
  user: {
    avatar_url: string;
    name: string;
    bio: string;
  }
}

interface Member {
  avatar_url: string;
  login: string;
  bio: string;
}

const Member: React.FC<MemberProps> = ({ user }) => {
  const { isFallback } = useRouter();
  
  if(isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <img src={user.avatar_url} alt={user.name} width="80" style={{ borderRadius: 48 }} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  )
}

console.log('Hello')

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.github.com/orgs/facebook/members`);
  const data = await response.json();

  const paths = data.map((member: Member) => {
    return {
      params: { login: member.login },
    }
  });
  
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { login } = context.params;

  const response = await fetch(`https://api.github.com/users/${login}`);
  const data = await response.json();

  return {
    props: {
      user: data,
    },
    revalidate: 10
  }
}

export default Member;