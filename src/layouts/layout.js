import React from 'react';
import { Layout } from 'antd';
import BaseLayout from 'components/BaseLayout';
import config from './layoutConfig';
import './Layout.less';

const { Header, SiderMenu } = BaseLayout;
// const { Content } = Layout;

const Layouts = ({ children, location }) => {
  const { fullPage = [] } = config;
  const { pathname } = location;

  return (
    <Layout className="coffee-layout">
      <Header />
      {!fullPage.includes(pathname) ? (
        <Layout className="coffee-layout-body">
          <SiderMenu />
          <main className="coffee-layout-content">{children}</main>
        </Layout>
      ) : (
        <Layout className="coffee-layout-body">{children}</Layout>
      )}
    </Layout>
  );
};

export default Layouts;
