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
      Message.success('编辑成功!');
    }
    
    reset();
    handleCancel();
  }, [handleCancel, reset, state]);

  const handleDelete = useCallback((dataSource: any) => {
    if (!dataSource) {
      return;
    }
    Dialog.confirm({
      title: '删除提醒',
      content: `确定删除?`,
      async onOk() {
        deletePayInfo(dataSource.roomid);  
        Message.success(`删除成功!`);
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
            {/* <Table.Column title="物业人员职工号" dataIndex="workid" resizable width={columnWidth.name} />
            <Table.Column title="物业人员姓名" dataIndex="workname" resizable width={columnWidth.email} /> */}
            <Table.Column title="房间" dataIndex="roomid" resizable width={columnWidth.phone} />
            {/* <Table.Column title="欠费金额" dataIndex="qfje" resizable width={columnWidth.phone} /> */}
            <Table.Column title="未缴电费" dataIndex="sdf" resizable width={columnWidth.gender} />
            <Table.Column title="未缴管理费" dataIndex="glf" resizable width={columnWidth.email} />
            <Table.Column title="未缴垃圾费" dataIndex="ljf" resizable width={columnWidth.phone} />
            {/* <Table.Column title="交费时间" dataIndex="jfsj" resizable width={columnWidth.gender} /> */}
            {/* <Table.Column
              title="操作"
              resizable
              width={columnWidth.operation}
              cell={cellOperation}
            /> */}
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
