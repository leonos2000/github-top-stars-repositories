import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int!, $after: String, $query: String!) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      nodes {
        ... on Repository {
          id
          name
          description
          stargazerCount
          forkCount
          url
          owner {
            login
            avatarUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      repositoryCount
    }
  }
`;
