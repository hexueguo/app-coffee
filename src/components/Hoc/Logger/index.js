/* eslint-disable */
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
