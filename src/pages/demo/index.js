import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'umi';
import CompBox from 'components/CompBox';
import Logger from './components/Logger';
import RequestDemo from './components/RequestDemo';
import { getTest } from './services';
import './index.less';
import RenderProps from './components/RenderProps';

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
      <CompBox title="request 请求">
        <RequestDemo />
      </CompBox>

      <CompBox title="Render Props">
        <RenderProps />
      </CompBox>

      <CompBox title="瀑布流">
        <Link to="/demo/waterfall">瀑布流</Link>
      </CompBox>
    </div>
  );
}

export default Demo;
