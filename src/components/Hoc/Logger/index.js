/* eslint-disable */
import React, { useEffect } from 'react';

// Logger Hoc
const Logger = (WrappedComponent) => {
  // useEffect(() => {
  //   console.log('WrapperComponent', WrappedComponent);
  //   console.log('Logger', props.logger);
  // }, []);

  return class extends React.Component {
    componentDidMount() {
      // console.log('Current props: ', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default Logger;
