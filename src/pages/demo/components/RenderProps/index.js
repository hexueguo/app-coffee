import React from 'react';
import { List, ListRenderChildren } from '@/components/RenderProps';
import MarkDownCode from '@/components/MarkDownCode';
import md from './index.md';

function RenderProps() {
  return (
    <div>
      <List render={(text) => <h2>{text}</h2>} />
      <ListRenderChildren>{(text) => <h2>{text}</h2>}</ListRenderChildren>

      <MarkDownCode source={md} />
    </div>
  );
}

export default RenderProps;
