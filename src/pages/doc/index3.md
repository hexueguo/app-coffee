## bind、call、apply区别

- 1、call(this,arg1,arg2,arg3) 
  * a.call(this,arg1,arg2,arg3...)
  * 当this为null / undefined时，默认指向window
  * 必须一次性传入所有参数
  * 临时改变一次this指向
  * 会立即调用func a 

  ```
  
  // 手写模拟call方法的思想
  /**
    * call方法思想：改变this指向，让新的对象可以执行这个方法
    * 实现思路：
    * 1、给新的对象添加一个函数（方法），并让this（也就是当前绑定的函数）指向这个函数
    * 2、执行这个函数
    * 3、执行完以后删除这个方法
    * 4、可以将执行结果返回
    */
  Function.prototype.mycall = function(funcCtx){

    // 验证调用该方法的对象是不是一个function
    if(typeof this !== 'function') {
        throw new TypeError('Erorr');
    }

    const _this = this;

    // 拿到新的this指向
    let ctx = funcCtx || global;
    ctx.fn = _this;

    // 获取其他参数
    const args = [...arguments].slice(1);
    //const args =  [].slice.apply(arguments,[1]);

    // 执行这个方法
    const result = ctx.fn(...args);

    // 执行完成，删除
    delete ctx.fn;
    
    return result;
  }
  ```

- 2、apply(this,[arg1,arg2,arg3])
  * b.apply(this,[arg1,arg2,arg3...])
  * 当this为null / undefined时，默认指向window
  * 临时改变一次this指向
  * 会立即调用func b

  小技巧，改变传参方式
  ```
  Math.max(1,10,3,2);// 是这样传参的
  const a = Math.max.apply(null,[1,10,3,2]);
  console.log(a); //10
  ```

  * 手写apply
  ```
  思路跟上面的call差不多类似
  ....
  // 获取其他参数
  let args = [];

  // 只需要判断一下arguments[1]是否存在
  if(arguments[1] && arguments[1] instanceof Array ){
    args = [...arguments[1]];
  }

  // 执行这个方法
  const result = ctx.fn(args);

  ```


- 3、bind(this,arg1,arg2,arg3) 
  * const c_ = c.apply(this,[arg1,arg2,arg3...])
  * 当this为null / undefined时，默认指向window
  * 参数列表可以分多次传入
  * 不会立即执行c,而是返回一个新的c_, c_中的this会被永久改变

  ```
  const arr=[1,10,5,8,12];
  const max=Math.max.bind(null,arr[0],arr[1],arr[2],arr[3])
  console.log(max(arr[4])); //12，分两次传参
  ```
  * 手写bind
  ```
  Function.prototype.mybind = function(){

    // 验证调用该方法的对象是不是一个function
    if(typeof this !== 'function') {
        throw new TypeError('Erorr');
    }
    
    const _this = this;
    const ctx = arguments[0] || global;
    let args = [...arguments].slice(1);
    // args = [].slice.call(arguments,1);

    return function(){
      args = [].concat.apply(args,arguments);
      _this.apply(ctx,args);
    }
  }
  ```