import React from 'react';
// import PropTypes from 'prop-types';
import MarkDown from 'react-markdown';
import { useTurnPage } from '@/components/Hooks';
import node1 from './node.md';
import SS from './index.less';

NodeJS.propTypes = {};

function NodeJS() {
  const nodes = [node1];

  const [pageNum, PageDom] = useTurnPage(nodes.length);

  return (
    <div className={SS.root}>
      <h1 className={SS.headTitle}>
        Hello,This is a NodeJS learning tutorial.
      </h1>
      <MarkDown source={nodes[pageNum - 1]} />

      {PageDom}
    </div>
  );
}

export default NodeJS;
