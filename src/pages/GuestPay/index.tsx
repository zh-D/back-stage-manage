import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import FusionCardPieChart from './component/FusionCardPieChart';

const { Cell } = ResponsiveGrid;

const Analysis = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="林科大小区"
        />
      </Cell>
      <Cell colSpan={12}>
        <FusionCardPieChart />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Analysis;
