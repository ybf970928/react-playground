import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UploadOutlined,
  LoginOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import "./app.css";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {

  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: '/undo',
              icon: <UserOutlined />,
              label: <Link to={"/undo"}>undo</Link>,
            },
            {
              key: '/upload',
              icon: <UploadOutlined />,
              label: <Link to={"/upload"}>upload</Link>,
            },
            {
              key: '/login',
              icon: <LoginOutlined />,
              label: <Link to={"/login"}>login</Link>,
            },
            {
              key: '/playground',
              icon: <PlayCircleOutlined />,
              label: <Link to={"/playground"}>playground</Link>,
            }
          ]}
          selectedKeys={selectedKeys}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;