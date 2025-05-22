import { render, screen } from '@testing-library/react';
import { RepositoriesTable } from '../RepositoriesTable';
import { mockRepositories, mockOnPageChange } from './mocks';

describe('RepositoriesTable', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders loading state correctly', () => {
    render(
      <RepositoriesTable
        repositories={[]}
        isLoading={true}
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const spinner = document.querySelector('[aria-busy="true"]');
    expect(spinner).toBeInTheDocument();
  });

  it('renders repositories data correctly', () => {
    render(
      <RepositoriesTable
        repositories={mockRepositories}
        isLoading={false}
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('test-user/test-repo')).toBeInTheDocument();
    expect(screen.getByText('Test repository')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders repository without description', () => {
    const repoWithoutDescription = {
      ...mockRepositories[0],
      description: null,
    };

    render(
      <RepositoriesTable
        repositories={[repoWithoutDescription]}
        isLoading={false}
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByText('Test repository')).not.toBeInTheDocument();
  });

  it('renders repository without primary language', () => {
    const repoWithoutLanguage = {
      ...mockRepositories[0],
      primaryLanguage: null,
    };

    render(
      <RepositoriesTable
        repositories={[repoWithoutLanguage]}
        isLoading={false}
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('renders pagination component', () => {
    render(
      <RepositoriesTable
        repositories={mockRepositories}
        isLoading={false}
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Total 10 pages')).toBeInTheDocument();
  });
});
