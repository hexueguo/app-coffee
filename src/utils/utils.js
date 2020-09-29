

// classnames库简易方法，使用方式跟classnames库一样
export const classnames = (...args) => {
  return args
    .map((el) => {
      if (typeof el === 'string') {
        return el;
      }
      if (el instanceof Object) {
        return Object.keys(el)
          .filter((it) => el[it])
          .join(' ');
      }
      return `${el}`;
    })
    .join(' ');
};