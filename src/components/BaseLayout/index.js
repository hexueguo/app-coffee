import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  // LaptopOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useHistory } from 'umi';
import { menus } from './config';
// import PropTypes from 'prop-types';
import './index.less';

const { Header } = Layout;
const { SubMenu, Item } = Menu;

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
      <Menu.Item link="/demo">demo</Menu.Item>
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

// 递归渲染menus
const renderMenus = (list) => {
  return list.map((el) => {
    const { key, title, icon, link, children } = el;
    if (children && children.length > 0) {
      return (
        <SubMenu key={key} icon={icon} title={title}>
          {renderMenus(children)}
        </SubMenu>
      );
    } else {
      return (
        <Item key={key} icon={icon} link={link}>
          {title}
        </Item>
      );
    }
  });
};

function SiderMenu({ location }) {
  const [collapse, setCollapse] = useState(false);
  const [selectKeys, setSelectKeys] = useState([]);
  const history = useHistory();

  useEffect(() => {
    findKeys(location.pathname);
  }, []);

  // 刷新页面时，根据路由选中对应的菜单
  const findKeys = (link) => {
    let selectedItem = {};

    const select = (list) => {
      list.find((el) => {
        const { children } = el;
        if (children && children.length > 0) {
          select(children);
          return false;
        } else {
          if (link.indexOf(el.link) > -1) {
            selectedItem = el;
          }
          return false;
        }
      });
    };
    select(menus); // 遍历菜单,根据当前路由匹配选中的菜单

    const { key } = selectedItem || {};
    setSelectKeys([key]);
  };

  const onMenuClick = ({ item, key }) => {
    history.push(item.props.link);
    setSelectKeys([key]);
  };

  return (
    <aside
      className={`coffee-layout-sider${
        collapse ? ' coffee-layout-sider-collapse' : ''
      }`}
    >
      <Menu
        className="coffee-layout-silder-menu"
        mode="inline"
        theme="dark"
        inlineCollapsed={collapse}
        onClick={onMenuClick}
        selectedKeys={selectKeys}
      >
        <div className="coffee-layout-silder-button">
          <MenuUnfoldOutlined
            className="coffee-layout-sider-trigger"
            onClick={() => {
              setCollapse(!collapse);
            }}
          />
        </div>
        {renderMenus(menus)}
      </Menu>
    </aside>
  );
}

BaseLayout.Header = LayoutHeader;
BaseLayout.SiderMenu = SiderMenu;

export default BaseLayout;
