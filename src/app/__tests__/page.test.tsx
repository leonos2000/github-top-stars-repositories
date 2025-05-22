import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { MockedProvider } from '@apollo/client/testing';
import { DEFAULT_QUERY } from '@/constants';
import { mockApolloClient } from '@/utils/tests/mocks/repositories';

describe('Home', () => {
  it('renders the page with search and table', async () => {
    render(
      <MockedProvider mocks={mockApolloClient}>
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
