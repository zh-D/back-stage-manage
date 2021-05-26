import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';

import styles from './index.module.scss';

import { useRequest } from 'ice';
import manService from '../../services/documan';
import store from '@/store'


interface ColumnWidth {
  name: number;
  email: number;
  phone: number;
  gender: number;
  operation: number;
}

interface DialogState {
  columnWidth: ColumnWidth;
  optCol: any;
  actionType: ActionType;
  actionVisible: boolean;
}

const defaultColumnWidth: ColumnWidth = {
  name: 500,
  email: 500,
  phone: 500,
  gender: 500,
  operation: 500,
};

const DialogTable: React.FC = () => {
  const [state, setState] = useSetState<DialogState>({
    columnWidth: defaultColumnWidth,
    optCol: null,
    actionType: 'preview',
    actionVisible: false,
  });
  const { request: getCleaningInfo } = useRequest(manService.getCleaningInfo);
  const { request: getGreeningInfo } = useRequest(manService.getGreeningInfo);
  const { request: getGuardInfo } = useRequest(manService.getGuardInfo);
  const [userState, userDispatchers] = store.useModel('user')

  const getTableData = async(
    formData: { status: 'normal' | 'empty' | 'exception' },
  ) => {
    const list = [
      {zgid:301,zgzw:'清洁工', zgname:'阿甲'},
      {zgid:302,zgzw:'清洁工', zgname:'阿已'},
      {zgid:303,zgzw:'清洁工', zgname:'阿马'},
      {zgid:101,zgzw:'安保员', zgname:'阿猛'},
      {zgid:102,zgzw:'安保员', zgname:'阿坤'},
      {zgid:103,zgzw:'安保员', zgname:'小小'},
      {zgid:201,zgzw:'绿化员', zgname:'阿锺'},
      {zgid:202,zgzw:'绿化员', zgname:'阿丁'},
      {zgid:501,zgzw:'维修员', zgname:'阿锋子'},
      {zgid:502,zgzw:'维修员', zgname:'阿六'},
    ];
    const data = ({
      total: list.length,
      list: list.slice(0, 10),
    })
    
    return await data;
  };
  
  const { actionVisible, columnWidth, optCol } = state;
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, error, refresh } = useFusionTable(getTableData, {
    field,
  });
  const { reset } = search;

  const onResizeChange = (dataIndex: keyof typeof defaultColumnWidth, width: number) => {
    const newWidth = {
      ...columnWidth,
    };
    newWidth[dataIndex] += width;
    setState({ columnWidth: newWidth });
  };


  return (
    <div className={styles.DialogTable}>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            onResizeChange={onResizeChange}
            emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            primaryKey="email"
          >
            <Table.Column title="职工号" dataIndex="zgid" resizable width={columnWidth.email} />
            <Table.Column title="职工职位" dataIndex="zgzw" resizable width={columnWidth.phone} />
            <Table.Column title="职工姓名" dataIndex="zgname" resizable width={columnWidth.gender} />
          </Table>
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            totalRender={(total) => (
              <>
                共{' '}
                <Button text type="primary">
                  {total}
                </Button>{' '}
                个记录
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default DialogTable;
