import React from 'react';
import loggerHoc from 'components/Hoc/Logger';

function Logger({ log }) {
  return <div style={{ fontSize: 20, color: '#000' }}>{`${log}`}</div>;
}

export default loggerHoc({ log: 'Log has been printed' })(Logger);
