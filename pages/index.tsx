import { GetStaticProps } from 'next';
import React from 'react';

interface HomeProps {
  org: {
    login: string;
    description: string;
    blog: string;
  }
}

const Home: React.FC<HomeProps> = ({ org }) => {
  return (
    <div>
      <h1>{org.login}</h1>
      <p>{org.description}</p>
      <p>Blog: <a href={org.blog}>{org.blog}</a></p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/facebook');
  const data = await response.json();

  return {
    props: {
      org: data,
    },
    revalidate: 10
  }
}

export default Home;
