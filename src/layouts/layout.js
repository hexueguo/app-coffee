import React from 'react';
import { Layout } from 'antd';
import BaseLayout from './BaseLayout';
import './Layout.less';

const { Header, SiderMenu } = BaseLayout;
// const { Content } = Layout;

const Layouts = ({ children }) => {
  return (
    <Layout className="coffee-layout">
      <Header />
      <Layout className="coffee-layout-body">
        <SiderMenu />
        <main className="coffee-layout-content">{children}</main>
      </Layout>
    </Layout>
  );
};

export default Layouts;
