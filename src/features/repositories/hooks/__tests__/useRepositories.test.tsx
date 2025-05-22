import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useRepositories } from '../useRepositories';
import { GetTopStarredRepositoriesDocument } from '@/graphql/generated';
import {
  mockGraphQLRepositories,
  mockGraphQLMocks,
  mockRepository,
} from '../../components/__tests__/mocks';

describe('useRepositories', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={mockGraphQLMocks}>{children}</MockedProvider>
  );

  it('should return initial state', () => {
    const { result } = renderHook(() => useRepositories(), { wrapper });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('should fetch and normalize repositories data', async () => {
    const fetchMocks = [
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjA=',
          },
        },
        result: {
          data: mockGraphQLRepositories,
        },
      },
    ];
    const fetchWrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={fetchMocks}>{children}</MockedProvider>
    );
    const { result } = renderHook(() => useRepositories(), { wrapper: fetchWrapper });

    // Wait for the query to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.repositories).toHaveLength(1);
    expect(result.current.repositories[0].name).toBe('test-repo');
    expect(result.current.repositories[0].description).toBe('Test repository');
    expect(result.current.repositories[0].stargazerCount).toBe(1000);
    expect(result.current.repositories[0].forkCount).toBe(100);
  });

  it('should handle pagination', async () => {
    const mockWithPagination = {
      __typename: 'Query',
      search: {
        __typename: 'SearchResultItemConnection',
        repositoryCount: 25,
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

    const paginationMocks = [
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjA=',
          },
        },
        result: {
          data: mockWithPagination,
        },
      },
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjEw',
          },
        },
        result: {
          data: mockWithPagination,
        },
      },
    ];

    const paginationWrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={paginationMocks}>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useRepositories(), { wrapper: paginationWrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setCurrentPage(2);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(3);
  });

  it('should handle error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjA=',
          },
        },
        error: new Error('An error occurred'),
      },
    ];
    const errorWrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMocks}>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useRepositories(), { wrapper: errorWrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.repositories).toEqual([]);
  });

  it('should handle loadMore function', async () => {
    const mockWithNextPage = {
      __typename: 'Query',
      search: {
        __typename: 'SearchResultItemConnection',
        repositoryCount: 1,
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: 'Y3Vyc29yOjEw',
        },
        edges: [
          {
            __typename: 'SearchResultItemEdge',
            node: mockRepository,
          },
        ],
      },
    };

    const loadMoreMocks = [
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjA=',
          },
        },
        result: {
          data: mockWithNextPage,
        },
      },
      {
        request: {
          query: GetTopStarredRepositoriesDocument,
          variables: {
            first: 10,
            after: 'Y3Vyc29yOjEw',
          },
        },
        result: {
          data: mockWithNextPage,
        },
      },
    ];

    const loadMoreWrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={loadMoreMocks}>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useRepositories(), { wrapper: loadMoreWrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.hasNextPage).toBe(true);
  });
});
