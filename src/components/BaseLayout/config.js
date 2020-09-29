import React from 'react';
import { UserOutlined } from '@ant-design/icons';

export const menus = [
  {
    key: '1',
    title: '基础页面',
    icon: <UserOutlined />,
    children: [
      {
        key: '11',
        title: 'demo',
        link: '/demo',
      },
      {
        key: '12',
        title: '文档',
        link: '/doc',
      },
    ],
  },
  {
    key: '2',
    title: '功能页面',
    icon: <UserOutlined />,
    children: [
      {
        key: '21',
        title: 'rtc Demo',
        link: '/rtc',
      },

      {
        key: '22',
        title: 'Live直播',
        link: '/live',
      },
    ],
  },
];
