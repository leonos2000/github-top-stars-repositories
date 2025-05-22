# GitHub Top Stars Repositories

A Next.js application that displays and manages GitHub repositories with the most stars. Built with modern web technologies and best practices.

## Features

- View top-starred GitHub repositories
- Modern UI built with Ant Design
- GraphQL integration with Apollo Client
- TypeScript for type safety
- Comprehensive testing setup with Jest
- Docker support for development and production
- Code quality tools (ESLint, Prettier, Husky)

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **UI Library**: Ant Design
- **State Management**: Apollo Client
- **API**: GraphQL
- **Testing**: Jest, React Testing Library
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier, Husky
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm 10.11.0 or later
- Docker and Docker Compose (for containerized development)
- GitHub Personal Access Token (for API access)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
```

To create a GitHub Personal Access Token:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate a new token with the following permissions:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
   - `read:org` (Read organization data)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd github-top-stars-repositories
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Development

The project includes Docker support for development and production environments:

```bash
# Start development environment
pnpm docker:dev

# Build containers
pnpm docker:build

# Stop containers
pnpm docker:down

# View logs
pnpm docker:logs

# Clean up Docker resources
pnpm docker:clean
```

## Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm codegen` - Generate GraphQL types
- `pnpm codegen:watch` - Watch and generate GraphQL types

### Code Quality

This project uses several tools to maintain code quality:

- **Prettier**: Code formatting

  ```bash
  pnpm format        # Format code
  pnpm format:check  # Check formatting
  ```

- **ESLint**: Code linting

  ```bash
  pnpm lint
  ```

- **Husky**: Git hooks for pre-commit and pre-push checks
  - Hooks are managed in the `.husky/` directory
  - Automatically installed via `prepare` script
  - No need to use deprecated `husky add` command

### Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── features/     # Feature-specific components and logic
├── graphql/      # GraphQL queries and mutations
├── lib/          # Utility functions and shared logic
└── constants.ts  # Application constants
```

## Testing

The project uses Jest and React Testing Library for testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```
