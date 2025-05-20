/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetTopStarredRepositories($first: Int!, $after: String) {\n  search(\n    type: REPOSITORY\n    query: \"is:public stars:>10000 topic:react\"\n    first: $first\n    after: $after\n  ) {\n    repositoryCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          stargazerCount\n          forkCount\n          url\n          owner {\n            login\n            avatarUrl\n          }\n          primaryLanguage {\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n}": typeof types.GetTopStarredRepositoriesDocument,
};
const documents: Documents = {
    "query GetTopStarredRepositories($first: Int!, $after: String) {\n  search(\n    type: REPOSITORY\n    query: \"is:public stars:>10000 topic:react\"\n    first: $first\n    after: $after\n  ) {\n    repositoryCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          stargazerCount\n          forkCount\n          url\n          owner {\n            login\n            avatarUrl\n          }\n          primaryLanguage {\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n}": types.GetTopStarredRepositoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTopStarredRepositories($first: Int!, $after: String) {\n  search(\n    type: REPOSITORY\n    query: \"is:public stars:>10000 topic:react\"\n    first: $first\n    after: $after\n  ) {\n    repositoryCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          stargazerCount\n          forkCount\n          url\n          owner {\n            login\n            avatarUrl\n          }\n          primaryLanguage {\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetTopStarredRepositories($first: Int!, $after: String) {\n  search(\n    type: REPOSITORY\n    query: \"is:public stars:>10000 topic:react\"\n    first: $first\n    after: $after\n  ) {\n    repositoryCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          stargazerCount\n          forkCount\n          url\n          owner {\n            login\n            avatarUrl\n          }\n          primaryLanguage {\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;