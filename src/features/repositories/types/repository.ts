import { Repository } from '@/graphql/generated';

export type NormalizedRepository = Pick<
  Repository,
  | 'id'
  | 'name'
  | 'description'
  | 'stargazerCount'
  | 'forkCount'
  | 'url'
  | 'owner'
  | 'primaryLanguage'
>;
