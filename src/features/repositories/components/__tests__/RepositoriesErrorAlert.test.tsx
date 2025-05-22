import { render, screen } from '@testing-library/react';
import { RepositoriesErrorAlert } from '../RepositoriesErrorAlert';

describe('RepositoriesErrorAlert', () => {
  it('renders error alert with correct message', () => {
    render(<RepositoriesErrorAlert />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText('Error loading repositories. Please try again later.')
    ).toBeInTheDocument();
  });

  it('renders error alert with icon', () => {
    render(<RepositoriesErrorAlert />);

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});
