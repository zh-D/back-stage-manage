import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';

import styles from './index.module.scss';

import { useRequest } from 'ice';
import houseService from '../../services/houseInfo';


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
  name: 140,
  email: 500,
  phone: 500,
  gender: 140,
  operation: 150,
};

const DialogTable: React.FC = () => {
  const [state, setState] = useSetState<DialogState>({
    columnWidth: defaultColumnWidth,
    optCol: null,
    actionType: 'preview',
    actionVisible: false,
  });
  const { request: getHouseInfo } = useRequest(houseService.getHouseInfo);
  const { request: deleteHouseInfo } = useRequest(houseService.deleteHouseInfo);
  const { request: editHouseInfo } = useRequest(houseService.editHouseInfo);

  const getTableData = (
    formData: { status: 'normal' | 'empty' | 'exception' },
  ): Promise<any> => {
    return getHouseInfo(formData)
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
      editHouseInfo(dataSource)
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
      content: `确定删除 ${dataSource.name} 吗`,
      async onOk() {
        deleteHouseInfo(dataSource.roomid);        
        Message.success(`${dataSource.name} 删除成功!`);
        reset();
      },
    });
  }, [reset]);

  const cellOperation = (...args: any[]): React.ReactNode => {
    const record = args[2];
    return (
      <div>
        <Button
          text
          type="primary"
          onClick={() => operationCallback({ actionType: 'edit', dataSource: record })}
        >
          编辑
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => handleDelete(record)}
        >
          删除
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => operationCallback({ actionType: 'preview', dataSource: record })}
        >
          查看
        </Button>
      </div>
    );
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
            <Table.Column title="房主" dataIndex="name" resizable width={columnWidth.name} />
            <Table.Column title="房间号" dataIndex="roomid" resizable width={columnWidth.email} />
            <Table.Column title="状态" dataIndex="state" resizable width={columnWidth.phone} />
            <Table.Column title="电话" dataIndex="phone" resizable width={columnWidth.gender} />
            <Table.Column
              title="操作"
              resizable
              width={columnWidth.operation}
              cell={cellOperation}
            />
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
