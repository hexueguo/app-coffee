import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { debounce, throttle } from 'lodash';
import template from './template';
import ss from './index.less';

WaterfallFlow.propTypes = {
  rootStyle: PropTypes.object, // root节点自定义样式
  dataSource: PropTypes.array, // 初始加载数据，每条数据必须有type、title、imgUrl
  itemKey: PropTypes.string, // 每条数据的唯一id
  renderItems: PropTypes.any, // 卡片内容
  rowsGap: PropTypes.number, // 每个卡片上下间隔，默认10
  columsGap: PropTypes.number, // 列之间的间隔宽度，默认10
  nextPageData: PropTypes.array, // 下一页数据，每条数据必须有type、title、imgUrl
  onScrollNext: PropTypes.func, // 加载下一页事件，（可选，如不选，可自行开发加载下一页逻辑）注意:必须要让root节点有滚动条才能让此方法生效
  scrollRestHeight: PropTypes.number, // 滚动加载到下一页剩余高度，默认30 （可选,配合onScrollNext使用）
};

WaterfallFlow.defaultProps = {
  rootStyle: {},
  dataSource: [],
  itemKey: '',
  renderItems: '',
  rowsGap: 10,
  columsGap: 10,
  nextPageData: [],
  onScrollNext: () => {},
  scrollRestHeight: 30,
};

let leftHeight = 0; // 左侧列表高度
let rightHeight = 0; // 右侧列表高度
const emptyHeight = 140;

function WaterfallFlow(props) {
  const {
    dataSource,
    renderItems,
    itemKey,
    rowsGap,
    columsGap,
    nextPageData,
    rootStyle,
    onScrollNext,
    scrollRestHeight,
  } = props;
  const [columsObj, setColumsObj] = useState([[], []]);

  useEffect(() => {
    // 默认初始化，将数据按一左一右渲染
    // const leftList = dataSource.filter((el, ind) => ind % 2 === 0);
    // const rightList = dataSource.filter((el, ind) => ind % 2 !== 0);
    // setColumsObj([leftList, rightList]);

    // 计算图片高度，重新渲染
    calculateOrder(dataSource, true);
  }, [dataSource]);

  useEffect(() => {
    // 渲染新一页数据
    calculateOrder(nextPageData, false);
  }, [nextPageData]);

  // 校验属性
  const checkAttr = (item) => {
    if (item.imgUrl && item.type && item.title) {
      return { flag: true, defaultCard: '' };
    }
    return {
      flag: false,
      errorCard: <Empty description="属性错误" className={ss.empty} />,
    };
  };

  // 计算排序
  const calculateOrder = (data, init) => {
    if (data && data.length > 0) {
      const leftList = [];
      const rightList = [];

      // 每个卡片的宽度
      const cardWidth =
        (document.getElementById('waterfall-grid').clientWidth - columsGap) / 2;

      data.forEach((item) => {
        // 校验属性
        const { flag, errorCard } = checkAttr(item);
        if (flag) {
          // 后台加载图片资源，计算图片显示高度
          // eslint-disable-next-line no-undef
          const img = new Image();
          img.src = item.imgUrl; // 图片
          // 计算文字部分高度
          const textHeight = template[item.type](item.title, cardWidth);

          img.onload = (imgDom) => {
            // 按比例计算每个图片显示的高度
            const imgHeight = imgDom.target.height;
            const imgWidth = imgDom.target.width;
            const realHeight = imgHeight / (imgWidth / cardWidth);

            if (leftHeight <= rightHeight) {
              leftList.push(item);
              leftHeight += realHeight + rowsGap + textHeight;
            } else {
              rightList.push(item);
              rightHeight += realHeight + rowsGap + textHeight;
            }

            onImgLoad({ leftList, rightList, init });
          };

          // 加载失败处理
          img.onerror = () => {
            if (leftHeight <= rightHeight) {
              leftList.push({
                ...item,
                errorCard: (
                  <Empty description="图片加载错误" className={ss.empty} />
                ),
              });
              leftHeight += emptyHeight + rowsGap;
            } else {
              rightList.push({
                ...item,
                errorCard: (
                  <Empty description="图片加载错误" className={ss.empty} />
                ),
              });
              rightHeight += emptyHeight + rowsGap;
            }
            onImgLoad({ leftList, rightList, init });
          };
        } else {
          if (leftHeight <= rightHeight) {
            leftList.push({ ...item, errorCard });
            leftHeight += emptyHeight + rowsGap;
          } else {
            rightList.push({ ...item, errorCard });
            rightHeight += emptyHeight + rowsGap;
          }
          onImgLoad({ leftList, rightList, init });
        }
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
      // 根据是否有
      onScroll={onScrollNext ? (event) => onScroll(event.target) : undefined}
    >
      <div
        className={ss.grid}
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
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
                <div
                  key={itemKey ? el[itemKey] : ind}
                  style={{ marginBottom: rowsGap }}
                >
                  {/* 判断是否渲染出错卡片 */}
                  {el.errorCard ? el.errorCard : renderItems(el, ind)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaterfallFlow;
