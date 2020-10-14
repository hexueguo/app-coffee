import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import MarkDownCode from '@/components/MarkDownCode';
import { getTestLoading } from '../../services';
import md from './index.md';
import './index.less';

function Index() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  const requestTest = () => {
    setLoading(true);
    getTestLoading('/loading').then((res) => {
      setLoading(false);
      setInfo(res.data);
    });
  };

  return (
    <>
      <Button onClick={requestTest}>请求</Button>
      <Spin spinning={loading}>
        {info && info.name ? (
          <div className="coffee-demo-loading">
            <div className="coffee-demo-text">{`姓名：${info.name}`}</div>
            <div className="coffee-demo-text">{`年龄：${info.age}`}</div>
          </div>
        ) : (
          <div className="coffee-demo-loading">
            <div className="coffee-demo-text">暂无数据</div>
          </div>
        )}
      </Spin>
      {/* <div>
        <DoubleRightOutlined />
      </div>
      <MarkDown className="coffee-demo-markdown" source={md} /> */}
      <MarkDownCode source={md} />
    </>
  );
}

export default Index;
