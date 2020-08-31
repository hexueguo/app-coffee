/* eslint-disable */
import React from 'react';
import MarkDown from 'react-markdown';
import PaddingComp from '@/components/PaddingComp';
import { useTurnPage } from '@/components/Hooks/index';
import markMD1 from './index1.md';
import markMD2 from './index2.md';

function index() {
  const [pageNum, PageDom] = useTurnPage(2);
  const mardArr = [markMD1, markMD2];

  return (
    <PaddingComp>
      <MarkDown source={mardArr[pageNum - 1]} />
      {PageDom}
    </PaddingComp>
  );
}

export default index;
