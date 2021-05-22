import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import DialogTable from './components/GreeningInfoTable';

const { Cell } = ResponsiveGrid;

const FusionDialogTable = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="房屋资料"
        />
      </Cell>

      <Cell colSpan={12}>
        <DialogTable />
      </Cell>
    </ResponsiveGrid>
  );
};

export default FusionDialogTable;
