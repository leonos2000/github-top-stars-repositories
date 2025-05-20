This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Code Quality: Prettier, ESLint, and Husky

This project uses Prettier, ESLint, and Husky for code quality and consistency.

- **Prettier**: Run `pnpm format` to auto-format code, or `pnpm format:check` to check formatting.
- **ESLint**: Run `pnpm lint` to check for lint errors.
- **Husky**: Git hooks are managed with Husky. Hooks are created manually in the `.husky/` directory (not with deprecated `husky add`).

### Setting up Husky (non-deprecated way)

After cloning or installing dependencies, run:

```sh
pnpm install
```

This will automatically run `husky install` via the `prepare` script.

To add or update hooks, manually edit files in `.husky/` (e.g., `.husky/pre-commit`, `.husky/pre-push`). Make sure they are executable:

```sh
chmod +x .husky/pre-commit .husky/pre-push
```

**Do not use `husky add` or other deprecated commands.**
