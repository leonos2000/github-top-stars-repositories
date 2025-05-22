import { render } from '@testing-library/react';
import Page from '../page';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

jest.mock('../../features/repositories/components/RepositoriesTable', () => ({
  RepositoriesTable: () => <div data-testid="repositories-table">Repositories Table</div>,
}));

const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

describe('Page', () => {
  it('renders RepositoriesTable component', () => {
    const { getByTestId } = render(
      <ApolloProvider client={mockClient}>
        <Page />
      </ApolloProvider>
    );
    expect(getByTestId('repositories-table')).toBeInTheDocument();
  });
});
