# module.exports 与 exports

### NodeJS 中为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令。

```
var exports = module.exports;
```

### 于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在 module.exports 上添加一样。注意，不能直接将 exports 变量指向一个值，因为这样等于切断了 exports 与 module.exports 的联系

```
// index.js
const a = 100;

console.log(module.exports); // 结果为：{}
console.log(exports); // 结果为：{}

exports.a = 200; //这里帮 module.exports 的内容给改成 {a : 200}

module.exports.b = 'this is b!';

exports = 'null'; // 把exports的指向指走

// test.js

const a = require('./index');
console.log(a) // a : 200
console.log(b) // this is b!

```

### `所以说require导入的，其实都是module.exports导出的对象，exports只是一个简写形式，它的指针初始化时，被指向module.exports，可以通过exports.xxx 为module.exports添加值，但后续exports指针改变，不会影响module.exports导出对象的值。`