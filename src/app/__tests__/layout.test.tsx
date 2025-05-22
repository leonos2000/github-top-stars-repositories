import { render } from '@testing-library/react';
import Layout from '../layout';

jest.mock('../../components/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Layout', () => {
  it('renders children within Providers', () => {
    const { container } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );

    expect(container.querySelector('[data-testid="providers"]')).toBeInTheDocument();
    expect(container.textContent).toContain('Test Child');
  });
});
