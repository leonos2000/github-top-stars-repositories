import { GetTopStarredRepositoriesQuery } from '@/graphql/generated';
import { NormalizedRepository } from '../types/repository';

export const normalizeRepository = (
  data: GetTopStarredRepositoriesQuery | undefined
): NormalizedRepository[] => {
  if (!data || !data?.search?.edges) {
    return [];
  }

  return data.search.edges
    .filter((elem) => elem?.node && elem?.node?.__typename === 'Repository')
    .map((elem) => elem!.node as NormalizedRepository);
};
