import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, throttle } from 'lodash';
import picArr from './testpick';
import ss from './index.less';

WaterfallFlow.propTypes = {
  rootStyle: PropTypes.object, // root节点自定义样式
  dataSource: PropTypes.array, // 初始加载数据
  renderItems: PropTypes.any, // 卡片内容
  itemKey: PropTypes.string, // 每条数据的唯一id
  imgKey: PropTypes.string.isRequired, // 图片地址key
  columsGap: PropTypes.number, // 列之间的间隔宽度，默认10
  nextPageData: PropTypes.array, // 下一页数据
  scrollRestHeight: PropTypes.number, // 滚动加载到下一页剩余高度，默认20
  onScrollNext: PropTypes.func, // 加载下一页事件
};

WaterfallFlow.defaultProps = {
  rootStyle: {},
  dataSource: [],
  renderItems: '',
  itemKey: '',
  columsGap: 10,
  nextPageData: [],
  scrollRestHeight: 20,
  onScrollNext: () => {},
};

let leftHeight = 0; // 左侧列表高度
let rightHeight = 0; // 右侧列表高度

function WaterfallFlow(props) {
  const {
    dataSource,
    renderItems,
    imgKey = 'imgUrl',
    itemKey,
    columsGap,
    nextPageData,
    rootStyle,
    scrollRestHeight,
    onScrollNext,
  } = props;
  const [columsObj, setColumsObj] = useState([[], []]);

  useEffect(() => {
    // 默认初始化，将数据按一左一右渲染
    const leftList = dataSource.filter((el, ind) => ind % 2 === 0);
    const rightList = dataSource.filter((el, ind) => ind % 2 !== 0);
    // const list1 = dataSource.slice(0, dataSource.length / 2);
    // const list2 = dataSource.slice(dataSource.length / 2);

    setColumsObj([leftList, rightList]);
    // 计算图片高度，重新渲染
    calculateOrder(dataSource, true);
  }, [dataSource]);

  useEffect(() => {
    // 渲染新一页数据
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
        // 后台加载图片资源，计算图片显示高度
        const img = new Image();
        img.src = item[imgKey]; //
        img.onload = (imgDom) => {
          // 按比例计算每个图片显示的高度
          const imgHeight = imgDom.target.height;
          const imgWidth = imgDom.target.width;
          const realHeight = imgHeight / (imgWidth / cardWidth);

          if (leftHeight <= rightHeight) {
            leftList.push(item);
            leftHeight += realHeight;
          } else {
            rightList.push(item);
            rightHeight += realHeight;
          }

          onImgLoad({ leftList, rightList, init });
        };
      });
    }
  };

  // 图片加载完成后重绘页面
  const onReload = ({ leftList = [], rightList = [], init }) => {
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

  // 滚动判断，500ms触发一次
  const onScroll = throttle((target) => {
    if (target !== null) {
      const cHeight = target.clientHeight;
      const sTop = target.scrollTop;
      const sHeight = target.scrollHeight;

      if (cHeight + sTop >= sHeight - scrollRestHeight) {
        onScrollNext();
      }
    }
  }, 500);

  return (
    <div
      className={ss.root}
      style={{ rootStyle }}
      onScroll={(e) => onScroll(e.target)}
    >
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
            {itArr.map((el, ind) => {
              return (
                // 添加key
                <div key={itemKey ? el[itemKey] : ind}>
                  {renderItems(el, ind)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

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
      dataSource={picArr}
      renderItems={(el, index) => {
        return (
          <div className={ss.card}>
            <img src={el.imgUrl} alt="" />
            <div>{`序号${index + 1}`}</div>
          </div>
        );
      }}
      nextPageData={nextPageData}
      onScrollNext={onScrollNext}
    />
  );
};

export default WaterfallFlowRender;
