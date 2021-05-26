import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import FusionCardPieChart from './component/FusionCardPieChart';
import FusionCardGroupBarChart from './component/FusionCardGroupBarChart';

const { Cell } = ResponsiveGrid;

const Analysis = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="林科大小区"
        />
      </Cell>
      <Cell colSpan={4}>
        <FusionCardPieChart />
      </Cell>
      <Cell colSpan={8}>
        <FusionCardGroupBarChart />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Analysis;
