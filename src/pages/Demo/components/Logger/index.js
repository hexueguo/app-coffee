import React from 'react';
import loggerHoc from 'components/Hoc/Logger';

function Logger() {
  return <div>xxx</div>;
}

export default loggerHoc()(Logger);
