import React from 'react';
// import PropTypes from 'prop-types';
import CompBox from 'components/CompBox';
import Logger from './components/Logger';

Demo.propTypes = {};

function Demo() {
  return (
    <div>
      <Logger />
      <CompBox>compBox</CompBox>
    </div>
  );
}

export default Demo;
