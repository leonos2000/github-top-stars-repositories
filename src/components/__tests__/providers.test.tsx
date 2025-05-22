import { render } from '@testing-library/react';
import { Providers } from '../Providers';

jest.mock('../../lib/apollo/client', () => ({
  apolloClient: {
    query: jest.fn(),
    mutate: jest.fn(),
    cache: {
      read: jest.fn(),
      write: jest.fn(),
      reset: jest.fn(),
    },
    link: {
      concat: jest.fn(),
    },
  },
}));

describe('Providers', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
