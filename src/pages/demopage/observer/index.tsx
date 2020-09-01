import React from 'react';

interface IProps {
  [key: string]: any;
}

function observer(props: IProps) {
  const { read } = props;
  return <div>{read}</div>;
}

export default observer;
