```
/**
 * 最简单的renderProps
 *
 * 其实就是通过提供了一个 render/children 方法，
 * 让外部组件自己定义如何渲染，我们只提供一些数据
 * 
 * 官方说明 render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
 */

import React from 'react';
import PropTypes from 'prop-types';

// render props
function List(props) {
  const { data, render } = props;
  return (
    <div>
      <div>Title is RenderProps!</div>
      {render(data || 'renderProps')}
    </div>
  );
}

// children props
function ListRenderChildren(props) {
  const { data, children } = props;
  return (
    <div>
      <div>Title is RenderChildren!</div>
      {children(data || 'renderChildren')}
    </div>
  );
}
ListRenderChildren.propTypes = {
  children: PropTypes.func.isRequired,
};

export { List, ListRenderChildren };



// 渲染
function RenderProps() {
  return (
    <div>
      <List render={(text) => <h2>{text}</h2>} />
      <ListRenderChildren>{(text) => <h2>{text}</h2>}</ListRenderChildren>

      <MarkDownCode source={md} />
    </div>
  );
}
```