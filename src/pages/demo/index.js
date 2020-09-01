import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import CompBox from 'components/CompBox';
import Logger from './components/Logger';
import RequestDemo from './components/RequestDemo';
import { getTest } from './services';
import './index.less';

Demo.propTypes = {};

function Demo() {
  useEffect(() => {
    getTest('/test', { time: new Date().toDateString() });
  }, []);

  return (
    <div className="coffee-demo">
      <h1>demo</h1>
      <CompBox title="Logger Hoc">
        <Logger test="test" />
      </CompBox>
      <RequestDemo />
    </div>
  );
}

export default Demo;
