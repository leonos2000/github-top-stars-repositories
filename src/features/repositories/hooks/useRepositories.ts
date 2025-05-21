import { useGetTopStarredRepositoriesQuery } from '@/graphql/generated';
import { normalizeRepository } from '../utils/normalizeRepository';
import { useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 10;
const DEFAULT_AFTER_VALUE = '0';

export const useRepositories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const afterValue =
    currentPage > 1 ? String((currentPage - 1) * ITEMS_PER_PAGE) : DEFAULT_AFTER_VALUE;

  const { data, loading, error, fetchMore } = useGetTopStarredRepositoriesQuery({
    variables: {
      first: ITEMS_PER_PAGE,
      after: Buffer.from(`cursor:${afterValue}`).toString('base64'),
    },
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = async () => {
    if (!data?.search.pageInfo.hasNextPage) {
      return;
    }

    await fetchMore({
      variables: {
        after: data.search.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          search: {
            ...fetchMoreResult.search,
            edges: [...(prev.search.edges ?? []), ...(fetchMoreResult.search.edges ?? [])],
          },
        };
      },
    });
  };

  const repositories = useMemo(() => {
    return normalizeRepository(data);
  }, [data]);

  const hasNextPage = data?.search.pageInfo.hasNextPage ?? false;
  const totalCount = data?.search.repositoryCount ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return {
    repositories,

    isLoading: loading,
    error,
    totalPages,
    totalCount,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    hasNextPage,

    loadMore,
    setCurrentPage,
  };
};
