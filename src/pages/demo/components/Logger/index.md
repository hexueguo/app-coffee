```
import React, { useEffect } from 'react';

// Logger Hoc 日志切面
const Logger = (otherProps) => {
  return (WrappedComponent) => {
    return (props) => {
      useEffect(() => {
        console.log('otherProps', otherProps);
        console.log('props', props);
      }, []);
      return <WrappedComponent {...props} {...otherProps} />;
    };
  };
};

export default Logger;

------

import React from 'react';
import loggerHoc from 'components/Hoc/Logger';

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

```