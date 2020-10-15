import React, { useState } from 'react';
import WaterfallFlow from '@/components/Waterfall';
import picArr from './testpick';
import ss from './index.less';

const WaterfallFlowRender = () => {
  const [nextPageData, setData] = useState([]);

  // useEffect(() => {
  // setInterval(() => {
  //   setData([...picArr]);
  // }, 5000);
  // }, []);
  const onScrollNext = () => {
    setData([...picArr]);
  };

  return (
    <WaterfallFlow
      rootStyle={{ width: 750, margin: 'auto' }}
      dataSource={picArr}
      renderItems={(el) => {
        return (
          <div className={ss.card}>
            <img src={el.imgUrl} alt="img" />
            <div className={ss.text}>{el.title}</div>
          </div>
        );
      }}
      nextPageData={nextPageData}
      onScrollNext={onScrollNext}
    />
  );
};

export default WaterfallFlowRender;
