import { RepositoryList } from '@/features/repositories/components/RepositoryList';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <RepositoryList />
    </main>
  );
}
