import React, { useState } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import MarkDown from 'react-markdown';
import PropTypes from 'prop-types';
import './index.less';
import { Tooltip } from 'antd';

MarkDownCode.propTypes = {
  source: PropTypes.any,
};
MarkDownCode.defaultProps = {
  source: '',
};

function MarkDownCode({ source, ...otherProps }) {
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <div className="coffee-markdowncode">
      <div
        className={`coffee-markdown-icon ${
          expand ? 'coffee-markdown-icon-expand' : ''
        }`}
      >
        <Tooltip title="code">
          <DoubleRightOutlined onClick={toggle} />
        </Tooltip>
      </div>
      <MarkDown
        className={`coffee-markdown ${expand ? 'coffee-markdown-expand' : ''}`}
        source={source}
        {...otherProps}
      />
    </div>
  );
}

export default MarkDownCode;
