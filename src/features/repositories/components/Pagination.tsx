import { Pagination as AntPagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-16 mb-12">
      <AntPagination
        current={currentPage}
        total={totalPages}
        pageSize={1}
        onChange={onPageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={(total) => `Total ${total} pages`}
        itemRender={(_, type, originalElement) => {
          if (type === 'prev') {
            return <LeftOutlined />;
          }
          if (type === 'next') {
            return <RightOutlined />;
          }
          return originalElement;
        }}
      />
    </div>
  );
};
