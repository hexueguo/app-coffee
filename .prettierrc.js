// {
//   "singleQuote": true,
//   "trailingComma": "all",
//   "printWidth": 80,
//   "overrides": [
//     {
//       "files": ".prettierrc",
//       "options": { "parser": "json" }
//     }
//   ]
// }

const fabric = require('./config/eslint');

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号，always:带括号
};
