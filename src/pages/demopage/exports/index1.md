## export 与 export default区别

### 1、export 导出是放到{}中,也可以直接导出变量

```
const a = 10;
const b = 20;
export {a, b};
export const c = 30;
```

### 2、export default 直接导出变量；

### 但在同一文件中只能是使用一次，否则会抛出错误提示 Syntax Error: SyntaxError: Parsing error: Only one default export allowed per module.
```
// index.js
const a = 10
export default a;

// index2.js
const b = () =>{
  return 'this is B!';
}
export default b;
```

### 3、export 配合import 使用

```
// index.js
const a = 10;
const b = 20;
export {a, b};
export const c = 30;

// test.js
import {a, b, c} from './index.js'; 
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

```

### 4、export default 配合import 使用
```
// index.js
const a = 10
export default a;

// test.js
import a from './index.js'; 
console.log(a); // 10

-----------

// index2.js
const b = () =>{
  return 'this is B!';
}
export default b;

// test2.js
import b from './index2.js'; 
console.log(b()); // this is B!

```

### 5、还有一种 import , 使用as关键字
```
// index.js
const a = 10;
const b = 20;
const c = () =>{
  return 'log C'; 
}
export {a, b};
export default C;

------------

// test.js
import * as all from './index.js'; 
console.log(all.a); // 10
console.log(all.b); // 20
console.log(all.c); // undefined；export default 的变量，无法在all访问到

```

### 运行打印结果
```
// test.js
const a = 10;
export const b = 20;
const c = () => {
  return 'this is C!';
};

export { a };
export default c;

------------------

// index.js
import c, { a, b } from './test';
import * as all from './test';


a：10
b：20
c：() => { return 'this is C!'; }
all.a：10
all.b：20
all.c：undefined

```