import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination with correct current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Total 10 pages')).toBeInTheDocument();
  });

  it('calls onPageChange when clicking next page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    const nextIcon = screen.getByLabelText('right');
    const nextLi = nextIcon.closest('li');
    expect(nextLi).not.toBeNull();
    fireEvent.click(nextLi!);

    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange.mock.calls[0][0]).toBe(2);
  });

  it('calls onPageChange when clicking previous page', () => {
    render(<Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />);

    const prevIcon = screen.getByLabelText('left');
    const prevLi = prevIcon.closest('li');
    expect(prevLi).not.toBeNull();
    fireEvent.click(prevLi!);

    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange.mock.calls[0][0]).toBe(1);
  });

  it('calls onPageChange when clicking a specific page number', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange.mock.calls[0][0]).toBe(3);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    const prevIcon = screen.getByLabelText('left');
    expect(prevIcon.closest('li')).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />);

    const nextIcon = screen.getByLabelText('right');
    expect(nextIcon.closest('li')).toHaveAttribute('aria-disabled', 'true');
  });
});
