import { render, screen, fireEvent, act } from '@testing-library/react';
import { RepositoriesSearch } from '../RepositoriesSearch';
import { DEFAULT_QUERY } from '@/constants';

describe('RepositoriesSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with empty input and placeholder', () => {
    render(<RepositoriesSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('updates input value immediately when typing', () => {
    render(<RepositoriesSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input).toHaveValue('test query');
  });

  it('calls onSearch with debounced value', async () => {
    jest.useFakeTimers();
    render(<RepositoriesSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    fireEvent.change(input, { target: { value: 'test query' } });

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
    jest.useRealTimers();
  });

  it('uses default query when input is empty', async () => {
    jest.useFakeTimers();
    render(<RepositoriesSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');

    const clearButton = screen.getByRole('button', { name: 'close-circle' });
    fireEvent.click(clearButton);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    await act(async () => {});

    expect(mockOnSearch).toHaveBeenCalledWith(DEFAULT_QUERY);
    jest.useRealTimers();
  });

  it('clears input when clear button is clicked', () => {
    render(<RepositoriesSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(`Example search: ${DEFAULT_QUERY}`);
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');

    const clearButton = screen.getByRole('button', { name: 'close-circle' });
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
  });
});
