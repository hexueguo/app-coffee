/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { debounce } from '@/utils';
import picArr from './testpick';
import ss from './index.less';

WaterfallFlow.propTypes = {};

function WaterfallFlow(props) {
  const { dataSource, renderItems } = props;
  const [columsObj, setColumsObj] = useState([[], []]);

  useEffect(() => {
    const list1 = dataSource.filter((el, ind) => ind % 2 !== 0);
    const list2 = dataSource.filter((el, ind) => ind % 2 === 0);

    setColumsObj([list1, list2]);
  }, [dataSource]);

  // 图片加载完成后重绘页面
  const onReload = () => {
    console.log('reload');
    const list1 =
      document.getElementById('waterfall-colums-0').childNodes || [];
    const list2 =
      document.getElementById('waterfall-colums-1').childNodes || [];
    list1.console.log('list1', list1);
    console.log('list2', list2);
  };

  // 图片加载完成事件
  const onImgLoad = debounce((ind) => {
    onReload(ind);
  }, 500);

  return (
    <div className={ss.root}>
      <div
        className={ss.grid}
        style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
      >
        {columsObj.map((itArr, index) => (
          <div
            className={ss.cardColums}
            style={{ width: '50%' }}
            key={index}
            id={`waterfall-colums-${index}`}
          >
            {itArr.map((el) => {
              return renderItems(
                itArr[parseInt(Math.random() * 6)],
                index,
                onImgLoad
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const WaterfallFlowRender = () => {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const list_ = [];
  //   for (let i = 0; i < 20; ) {
  //     list_.push(Math.ceil(Math.random() * 200 + 100));
  //     i += 1;
  //   }
  //   setList(list_);
  // }, []);

  // const img = new Image();
  // img.src =
  //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg';
  // img.onload = (res) => {
  //   console.log('res', res);
  // };

  return (
    <WaterfallFlow
      dataSource={picArr}
      renderItems={(el, index, onImgLoad) => {
        return (
          <div>
            <img src={el} alt="" onLoad={() => onImgLoad(index)} />
            {/* {`序号${index + 1}`} */}
            <div>{`序号${index + 1}`}</div>
          </div>
        );
      }}
      // onImgLoad={}
    />
  );
};

export default WaterfallFlowRender;
