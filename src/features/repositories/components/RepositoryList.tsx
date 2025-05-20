'use client';

import { useGetTopStarredRepositoriesQuery } from '@/graphql/generated';
import { List, Card, Typography, Space, Tag } from 'antd';

const { Title, Text } = Typography;

export function RepositoryList() {
  const { data, loading, error } = useGetTopStarredRepositoriesQuery({
    variables: {
      first: 10,
    },
  });

  if (loading) {
    return <div>Loading repositories...</div>;
  }

  if (error) {
    return <div>Error loading repositories: {error.message}</div>;
  }

  console.log('Repositories data:', data);

  return (
    <div className="p-4">
      <Title level={2}>Top React Repositories</Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        dataSource={data?.search.edges?.map((edge) => edge?.node)}
        loading={loading}
        renderItem={(repo) => {
          if (!repo || !('name' in repo)) return null;

          return (
            <List.Item>
              <Card hoverable>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <Title level={4}>{repo.name}</Title>
                  </a>
                  <Text type="secondary">{repo.description}</Text>
                  <Space>
                    <Tag color="gold">⭐ {repo.stargazerCount.toLocaleString()} stars</Tag>
                    <Tag color="blue">🍴 {repo.forkCount.toLocaleString()} forks</Tag>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
