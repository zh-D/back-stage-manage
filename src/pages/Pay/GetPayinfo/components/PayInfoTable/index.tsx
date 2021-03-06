import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';

import styles from './index.module.scss';

import { useRequest } from 'ice';
import payService from '../../../services/pay';


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
  const { request: getOweInfo } = useRequest(payService.getOweInfo);
  const { request: deletePayInfo } = useRequest(payService.deletePayInfo);
  const { request: editPayInfo } = useRequest(payService.editPayInfo);

  const getTableData = (
    formData: { status: 'normal' | 'empty' | 'exception' },
  ): Promise<any> => {
    return getOweInfo(formData)
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

  const operationCallback = useCallback(({ actionType, dataSource }: OperaitionProps): void => {
    setState({
      actionType,
      optCol: dataSource,
      actionVisible: true,
    });
  }, [setState]);

  const handleCancel = useCallback((): void => {
    setState({ actionVisible: false });
  }, [setState]);

  const handleOk = useCallback(async (dataSource): Promise<void> => {
    const { actionType } = state;
    if (actionType === 'preview') {
      handleCancel();
      return;
    }

    if (actionType === 'edit') {
      editPayInfo(dataSource)
      Message.success('????????????!');
    }
    
    reset();
    handleCancel();
  }, [handleCancel, reset, state]);

  const handleDelete = useCallback((dataSource: any) => {
    if (!dataSource) {
      return;
    }
    Dialog.confirm({
      title: '????????????',
      content: `?????????????`,
      async onOk() {
        deletePayInfo(dataSource.roomid);  
        Message.success(`????????????!`);
        reset();
      },
    });
  }, [reset]);

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
            {/* <Table.Column title="?????????????????????" dataIndex="workid" resizable width={columnWidth.name} />
            <Table.Column title="??????????????????" dataIndex="workname" resizable width={columnWidth.email} /> */}
            <Table.Column title="??????" dataIndex="roomid" resizable width={columnWidth.phone} />
            {/* <Table.Column title="????????????" dataIndex="qfje" resizable width={columnWidth.phone} /> */}
            <Table.Column title="????????????" dataIndex="sdf" resizable width={columnWidth.gender} />
            <Table.Column title="???????????????" dataIndex="glf" resizable width={columnWidth.email} />
            <Table.Column title="???????????????" dataIndex="ljf" resizable width={columnWidth.phone} />
            {/* <Table.Column title="????????????" dataIndex="jfsj" resizable width={columnWidth.gender} /> */}
            {/* <Table.Column
              title="??????"
              resizable
              width={columnWidth.operation}
              cell={cellOperation}
            /> */}
          </Table>
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            totalRender={(total) => (
              <>
                ???{' '}
                <Button text type="primary">
                  {total}
                </Button>{' '}
                ?????????
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
      <DialogOperation
        visible={actionVisible}
        actionType={state.actionType}
        dataSource={optCol}
        onOk={handleOk}
        onClose={handleCancel}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DialogTable;
