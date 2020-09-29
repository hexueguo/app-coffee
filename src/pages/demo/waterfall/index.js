/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { debounce } from '@/utils';
import picArr from './testpick';
import ss from './index.less';

WaterfallFlow.propTypes = {};

let list1Height = 0;
let list2Height = 0;

function WaterfallFlow(props) {
  const {
    dataSource,
    renderItems,
    imgKey = 'imgUrl',
    columsGap = 10,
    // rowsGap = 10,
    nextPageData = [],
  } = props;
  const [columsObj, setColumsObj] = useState([[], []]);

  useEffect(() => {
    const list1 = dataSource.filter((el, ind) => ind % 2 === 0);
    const list2 = dataSource.filter((el, ind) => ind % 2 !== 0);
    // const list1 = dataSource.slice(0, dataSource.length / 2);
    // const list2 = dataSource.slice(dataSource.length / 2);

    setColumsObj([list1, list2]);
    calculateOrder(dataSource, true);
  }, [dataSource]);

  useEffect(() => {
    calculateOrder(nextPageData, false);
  }, [nextPageData]);

  // 计算排序
  const calculateOrder = (data, init) => {
    if (data && data.length > 0) {
      const leftList = [];
      const rightList = [];

      // 每个卡片的宽度
      const cardWidth =
        (document.getElementById('waterfall-grid').clientWidth - 10) / 2;

      data.forEach((item) => {
        const img = new Image();
        img.src = item[imgKey]; //
        img.onload = (imgDom) => {
          // console.log('left', list1Height, 'right', list2Height);
          // const cardWidth =
          //   (document.getElementById('waterfall-grid').clientWidth - 10) / 2;

          // 按比例计算每个图片显示的高度
          const imgHeight = imgDom.target.height;
          const imgWidth = imgDom.target.width;
          const realHeight = imgHeight / (imgWidth / cardWidth);

          if (list1Height <= list2Height) {
            console.log('leftList', '+', realHeight);
            leftList.push(item);
            list1Height += realHeight;
          } else {
            console.log('rightList', '+', realHeight);
            rightList.push(item);
            list2Height += realHeight;
          }

          onImgLoad({ leftList, rightList, init });
        };
      });
    }
  };

  // 图片加载完成后重绘页面
  const onReload = ({ leftList = [], rightList = [], init }) => {
    console.log('reload');
    if (init) {
      // 第一次
      setColumsObj([leftList, rightList]);
    } else {
      // 翻页
      setColumsObj([
        [...columsObj[0], ...leftList],
        [...columsObj[1], ...rightList],
      ]);
    }
  };

  // 图片加载完成事件
  const onImgLoad = debounce((rest) => {
    onReload(rest);
  }, 500);

  console.log('columsObj', columsObj);

  return (
    <div className={ss.root}>
      <div
        className={ss.grid}
        style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
        id="waterfall-grid"
      >
        {columsObj.map((itArr, index) => (
          <div
            className={ss.cardColums}
            style={{
              width: `calc(50% - ${columsGap / 2}px)`,
              marginRight: index === 0 ? `${columsGap}px` : 0,
            }}
            key={index}
            id={`waterfall-colums-${index}`}
          >
            {itArr.map((el) => {
              const item = renderItems(
                // itArr[parseInt(Math.random() * 7)]
                el,
                index
                // onImgLoad
              );
              // console.log('item', item);
              return item;
              // return renderItems(
              //   itArr[parseInt(Math.random() * 7)],
              //   index,
              //   onImgLoad
              // );
            })}
          </div>
        ))}
      </div>
      {/* <div className={ss.cacheList} id="waterfall-cache-list">
        {dataSource.map((el, index) => {
          return renderItems(
            dataSource[parseInt(Math.random() * 14)],
            index,
            onImgLoad
          );
        })}
      </div> */}
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

  const [nextPageData, setData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setData([...picArr]);
    }, 5000);
  }, []);

  return (
    <WaterfallFlow
      dataSource={picArr}
      renderItems={(el, index) => {
        return (
          <div>
            <img src={el.imgUrl} alt="" />
            {/* {`序号${index + 1}`} */}
            <div>{`序号${index + 1}`}</div>
          </div>
        );
      }}
      nextPageData={nextPageData}
      // onImgLoad={}
    />
  );
};

export default WaterfallFlowRender;
