import { Layout, Alert } from 'antd';

const { Content } = Layout;

export const RepositoriesErrorAlert = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <Alert
          message="Error"
          description="Error loading repositories. Please try again later."
          type="error"
          showIcon
        />
      </Content>
    </Layout>
  );
};
