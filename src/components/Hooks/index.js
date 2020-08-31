/* eslint-disable */
import React, { useState } from 'react';
import { message } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './index.less';

// 翻页hook
function useTurnPage(totalPage = 1) {
  const [pageNum, setPageNum] = useState(1);

  const prePage = () => {
    setPageNum(pageNum - 1);
  };

  const nextPage = () => {
    if (pageNum === totalPage) {
      message.info('已到最后一篇');
      return;
    }
    setPageNum(pageNum + 1);
  };

  return [
    pageNum,
    <footer className="coffee-turnPage">
      {pageNum <= totalPage && (
        <div onClick={nextPage} className="coffee-turnPage-button">
          <span className="coffee-turnPage-button-text">下一篇</span>
          <DoubleRightOutlined />
        </div>
      )}
      {pageNum > 1 && (
        <div onClick={prePage} className="coffee-turnPage-button">
          <DoubleLeftOutlined />
          <span className="coffee-turnPage-button-text">上一篇</span>
        </div>
      )}
    </footer>,
  ];
}

// export default useTurnPage;

export { useTurnPage };
