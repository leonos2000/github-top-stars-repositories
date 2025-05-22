import { NormalizedRepository } from '../../types/repository';
import { GetTopStarredRepositoriesDocument } from '@/graphql/generated';

const BASE64_CURSOR_0 = 'Y3Vyc29yOjA='; // cursor:0

export const mockRepository = {
  __typename: 'Repository',
  id: '1',
  name: 'test-repo',
  url: 'https://github.com/test/test-repo',
  description: 'Test repository',
  stargazerCount: 1000,
  forkCount: 100,
  isPrivate: false,
  isFork: false,
  isArchived: false,
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
  pushedAt: '2020-01-01T00:00:00Z',
  visibility: 'PUBLIC',
  owner: {
    id: 'owner-1',
    login: 'test-user',
    avatarUrl: 'https://github.com/avatar.png',
    repositories: {
      totalCount: 10,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
        __typename: 'PageInfo',
      },
      totalDiskUsage: 0,
      __typename: 'RepositoryConnection',
    },
    resourcePath: '/test-user',
    url: 'https://github.com/test-user',
    __typename: 'RepositoryOwner' as const,
  },
  primaryLanguage: {
    id: 'lang-1',
    name: 'TypeScript',
    color: '#2b7489',
    __typename: 'Language' as const,
  },
} as const;

export const mockRepositories: NormalizedRepository[] = [mockRepository];

export const mockGraphQLRepositories = {
  search: {
    __typename: 'SearchResultItemConnection',
    repositoryCount: 1,
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
    edges: [
      {
        __typename: 'SearchResultItemEdge',
        node: mockRepository,
      },
    ],
  },
};

export const mockGraphQLMocks = [
  {
    request: {
      query: GetTopStarredRepositoriesDocument,
      variables: {
        first: 10,
        after: BASE64_CURSOR_0,
      },
    },
    result: {
      data: mockGraphQLRepositories,
    },
  },
];

export const mockErrorMocks = [
  {
    request: {
      query: GetTopStarredRepositoriesDocument,
      variables: {
        first: 10,
        after: BASE64_CURSOR_0,
      },
    },
    error: new Error('An error occurred'),
  },
];

export const mockOnPageChange = jest.fn();
