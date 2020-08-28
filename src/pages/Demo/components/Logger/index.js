import React from 'react';
import loggerHoc from 'components/Hoc/Logger';

function Logger({ log, des }) {
  return (
    <div style={{ fontSize: 20, color: '#000' }}>
      <div>{`${log}`}</div>
      <div>{`${des}`}</div>
    </div>
  );
}

export default loggerHoc({ log: 'Log has been printed', des: '日志已被打印' })(
  Logger
);
