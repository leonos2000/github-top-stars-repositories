'use client';

import { Layout, Typography } from 'antd';
import { RepositoriesTable } from '@/features/repositories/components/RepositoriesTable';
import { RepositoriesErrorAlert } from '@/features/repositories/components/RepositoriesErrorAlert';
import { useRepositories } from '@/features/repositories/hooks/useRepositories';
import { RepositoriesSearch } from '@/features/repositories/components/RepositoriesSearch';

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const {
    repositories,
    isLoading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    setSearchQuery,
  } = useRepositories();

  if (error) {
    return <RepositoriesErrorAlert />;
  }

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <Title level={2} className="mb-8">
            Most Starred GitHub Repositories
          </Title>

          <RepositoriesSearch onSearch={setSearchQuery} />
          <RepositoriesTable
            repositories={repositories}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Content>
    </Layout>
  );
}
