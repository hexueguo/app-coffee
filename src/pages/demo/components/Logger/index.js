import React from 'react';
import loggerHoc from '@/components/Hoc/Logger';
import MarkDownCode from '@/components/MarkDownCode';
import md from './index.md';
import './index.less';

function Logger({ log, des }) {
  return (
    <div className="coffee-demo-logger">
      <div className="coffee-demo-logger-text">{`${log}`}</div>
      <div className="coffee-demo-logger-text">{`${des}`}</div>

      <MarkDownCode source={md} />
    </div>
  );
}

export default loggerHoc({ log: 'Log has been printed', des: '日志已被打印' })(
  Logger
);
