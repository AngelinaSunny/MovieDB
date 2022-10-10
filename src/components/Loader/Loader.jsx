import { Space, Spin } from 'antd';

const Loader = () => (
  <div className="example">
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  </div>
);

export default Loader;
