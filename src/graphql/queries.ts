import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int!, $after: String) {
    search(
      query: "stars:>1000 sort:stars-desc topic:react"
      type: REPOSITORY
      first: $first
      after: $after
    ) {
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
