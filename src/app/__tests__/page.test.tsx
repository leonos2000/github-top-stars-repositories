import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { MockedProvider } from '@apollo/client/testing';
import { GetTopStarredRepositoriesDocument } from '@/graphql/generated';
import { mockGraphQLRepositories } from '@/features/repositories/components/__tests__/mocks';
import { DEFAULT_QUERY } from '@/constants';

describe('Home', () => {
  const mocks = [
    {
      request: {
        query: GetTopStarredRepositoriesDocument,
        variables: {
          first: 10,
          after: 'Y3Vyc29yOjA=',
          query: DEFAULT_QUERY,
        },
      },
      result: {
        data: mockGraphQLRepositories,
      },
    },
  ];

  it('renders the page with search and table', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByText('Most Starred GitHub Repositories')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    expect(searchInput).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
