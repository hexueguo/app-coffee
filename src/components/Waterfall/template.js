// 模板，计算返回每种模板的文字高度
const template = {
  // 精简  会议/资讯/项目
  simple: (title = '', width = 0) => {
    const titleHeight = 18;
    const padding = 10; // 上下padding高度
    if (title.length * 13 > width - padding * 2) {
      // title两行
      return titleHeight * 2 + padding * 2;
    }
    // 一行
    return titleHeight + padding * 2;
  },

  // 直播
  live: (title = '', width = 0) => {
    const titleHeight = 18;
    const titleFontSize = 13;
    const titlePaddingBottom = 7;
    const nameHeight = 11; // 名称高度
    const padding = 10; // 上下padding高度
    if (title.length * titleFontSize > width - padding * 2) {
      // title两行
      return titleHeight * 2 + titlePaddingBottom + nameHeight + padding * 2;
    }
    // 一行
    return titleHeight + titlePaddingBottom + nameHeight + padding * 2;
  },
};

export default template;
