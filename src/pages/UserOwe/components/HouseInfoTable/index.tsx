import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';

import styles from './index.module.scss';

import { useRequest } from 'ice';
import oweService from '../../services/owe';
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
  const { request: getOweInfo } = useRequest(oweService.getOweInfo);
  const [userState, userDispatchers] = store.useModel('user')

  const getTableData = (
    formData: { status: 'normal' | 'empty' | 'exception' },
  ): Promise<any> => {
    return getOweInfo(formData, userState.role)
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
            <Table.Column title="房间号" dataIndex="roomid" resizable width={columnWidth.email} />
            <Table.Column title="水电费" dataIndex="sdf" resizable width={columnWidth.phone} />
            <Table.Column title="管理费" dataIndex="glf" resizable width={columnWidth.gender} />
            <Table.Column title="垃圾费" dataIndex="ljf" resizable width={columnWidth.gender} />
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
