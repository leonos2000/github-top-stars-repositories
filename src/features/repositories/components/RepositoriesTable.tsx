import { Typography, Spin, Table, Space, Avatar } from 'antd';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';
import { Pagination } from './Pagination';
import { NormalizedRepository } from '../types/repository';

const { Text } = Typography;

const columns = [
  {
    title: 'Avatar',
    key: 'avatar',
    width: 80,
    render: (record: NormalizedRepository) => (
      <Avatar src={record.owner.avatarUrl} alt={`${record.owner.login}'s avatar`} size={40} />
    ),
  },
  {
    title: 'Repository',
    key: 'name',
    width: 400,
    render: (record: NormalizedRepository) => (
      <div>
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          {record.owner.login}/{record.name}
        </a>
        {record.description && (
          <Text type="secondary" className="block mt-1">
            {record.description}
          </Text>
        )}
      </div>
    ),
  },
  {
    title: 'Stars',
    dataIndex: 'stargazerCount',
    key: 'stargazerCount',
    width: 120,
    render: (count: NormalizedRepository['stargazerCount']) => (
      <Space>
        <StarOutlined className="text-yellow-500" />
        <Text strong>{count}</Text>
      </Space>
    ),
  },
  {
    title: 'Forks',
    dataIndex: 'forkCount',
    key: 'forkCount',
    width: 120,
    render: (count: NormalizedRepository['forkCount']) => (
      <Space>
        <ForkOutlined className="text-blue-500" />
        <Text strong>{count}</Text>
      </Space>
    ),
  },
  {
    title: 'Language',
    dataIndex: 'primaryLanguage',
    key: 'primaryLanguage',
    width: 150,
    render: (language: NormalizedRepository['primaryLanguage']) =>
      language ? (
        <Space>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: language.color ?? '#ccc' }}
          />
          <Text>{language.name}</Text>
        </Space>
      ) : null,
  },
];

interface RepositoriesTableProps {
  repositories: NormalizedRepository[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const RepositoriesTable = ({
  repositories,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: RepositoriesTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Table
        dataSource={repositories}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="mb-4"
        scroll={{ x: 900 }}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};
