import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

export const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    console.error(
      'GitHub token is not defined! Please add NEXT_PUBLIC_GITHUB_TOKEN to your .env file'
    );
    throw new Error('GitHub token is required for the application to work');
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      'User-Agent': 'github-top-stars-repositories',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
