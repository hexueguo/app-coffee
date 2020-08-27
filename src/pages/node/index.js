import React from 'react';
// import PropTypes from 'prop-types';
import MarkDown from 'react-markdown';
import nodeMd from './node.md';
import SS from './index.less';

NodeJS.propTypes = {};

function NodeJS() {
  return (
    <div className={SS.root}>
      <h1 className={SS.headTitle}>
        Hello,This is a NodeJS learning tutorial.
      </h1>
      <MarkDown source={nodeMd} />
    </div>
  );
}

export default NodeJS;
