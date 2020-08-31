import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  // LaptopOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useHistory } from 'umi';
// import PropTypes from 'prop-types';
import './index.less';

const { Header } = Layout;
const { SubMenu } = Menu;

function BaseLayout() {}
BaseLayout.propTypes = {};

function Logo() {
  return <div className="coffee-header-logo" />;
}

function HeaderMenu() {
  const history = useHistory();
  const onMenuClick = ({ item }) => {
    history.push(item.props.link);
  };
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="coffee-header-menu"
      onClick={onMenuClick}
    >
      <Menu.Item link="/home">首页</Menu.Item>
      <Menu.Item link="/node">NodeJS</Menu.Item>
      <Menu.Item link="/demo">Demo</Menu.Item>
    </Menu>
  );
}

function LayoutHeader() {
  return (
    <Header className="coffee-header">
      <div className="coffee-header-left">
        <Logo />
        <div className="coffee-header-text">C o f f e e</div>
        <HeaderMenu />
      </div>
      <div className="coffee-header-right">
        <UserOutlined className="coffee-header-user" />
      </div>
    </Header>
  );
}

function SiderMenu() {
  const [collapse, setCollapse] = useState(false);
  const history = useHistory();

  const onMenuClick = ({ item }) => {
    history.push(item.props.link);
  };

  return (
    <aside
      className={`coffee-layout-sider${
        collapse ? 'coffee-layout-sider-collapse' : ''
      }`}
    >
      <Menu
        className="coffee-layout-silder-menu"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        inlineCollapsed={collapse}
        onClick={onMenuClick}
      >
        <div className="coffee-layout-silder-button">
          <MenuUnfoldOutlined
            className="coffee-layout-sider-trigger"
            onClick={() => {
              setCollapse(!collapse);
            }}
          />
        </div>
        <SubMenu key="sub1" icon={<UserOutlined />} title="基础页面">
          <Menu.Item key="1" link="/demo">
            Demo
          </Menu.Item>
          {/* <Menu.Item key="2" link="/home">
            Home
          </Menu.Item> */}
        </SubMenu>
        {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="项目配置">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu> */}
      </Menu>
    </aside>
  );
}

BaseLayout.Header = LayoutHeader;
BaseLayout.SiderMenu = SiderMenu;

export default BaseLayout;
