import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';

import styles from './index.module.scss';

import { useRequest } from 'ice';
import guardService from '../../../services/guard';


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
  const { request: getGuardInfo } = useRequest(guardService.getGuardInfo);
  const { request: deleteGuardInfo } = useRequest(guardService.deleteGuardInfo);
  const { request: editGuardInfo } = useRequest(guardService.editGuardInfo);

  const getTableData = (
    formData: { status: 'normal' | 'empty' | 'exception' },
  ): Promise<any> => {
    return getGuardInfo(formData)
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
      editGuardInfo(dataSource)
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
      content: `???????????? ${dataSource.abryname} ???`,
      async onOk() {
        deleteGuardInfo(dataSource.abryid);        
        Message.success(`${dataSource.abryname} ????????????!`);
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
          ??????
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => handleDelete(record)}
        >
          ??????
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => operationCallback({ actionType: 'preview', dataSource: record })}
        >
          ??????
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
            <Table.Column title="???????????????" dataIndex="abryid" resizable width={columnWidth.name} />
            <Table.Column title="????????????" dataIndex="abryname" resizable width={columnWidth.email} />
            <Table.Column title="????????????" dataIndex="ldh" resizable width={columnWidth.phone} />
            <Table.Column title="????????????" dataIndex="xlsj" resizable width={columnWidth.gender} />
            <Table.Column
              title="??????"
              resizable
              width={columnWidth.operation}
              cell={cellOperation}
            />
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
