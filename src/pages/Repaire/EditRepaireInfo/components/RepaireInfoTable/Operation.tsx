import React, { useEffect, useImperativeHandle } from 'react';
import { Select, Form, Field, Input, Message } from '@alifd/next';

const FormItem = Form.Item;

export type ActionType = 'add' | 'edit' | 'preview';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface OperaitionProps {
  /**
   * 操作类型, 以此来标识是添加、编辑、还是查看
   */
  actionType: ActionType;

  /**
   * 数据源
   */
  dataSource: any;
}

export interface OperationRef {
  getValues: (callback: (vals: Record<string, unknown>) => void) => void;
}

const Operation: React.ForwardRefRenderFunction<OperationRef, OperaitionProps> = (props, ref) => {
  const { actionType } = props;
  const dataSource = props.dataSource || {};
  const field = Field.useField([]);
  useEffect(() => {
    field.reset();
    if (dataSource) {
      const newValues = {
        wxid: dataSource.wxid,
        wxryname: dataSource.wxryname,
        roomid: dataSource.roomid,
        wxsj: dataSource.wxsj,
        wxwp: dataSource.wxwp,
        wxje: dataSource.wxje
      };
      field.setValues(newValues);
    }
  }, [field, dataSource]);
  useImperativeHandle<OperationRef, OperationRef>(
    ref,
    () => {
      return {
        getValues(callback: (vals: Record<string, unknown>) => void) {
          field.validate((errors, values): void => {
            for (let key in values) {
              if (!values[key]) {
                Message.error("信息不完整！");
                return
              }
            }
            console.log(values);
            
            callback(values);
          });
        },
      };
    },
  );

  const isPreview = actionType === 'preview';

  return (
    <>
      <Form
        isPreview={isPreview}
        fullWidth
        labelAlign={isPreview ? 'left' : 'top'}
        field={field}
        {...formItemLayout}
      >
        <FormItem
          label="维修员职工号:"
          required
          requiredMessage="必填"
        >
          <Input
            {...field.init('wxid')}
            placeholder="请输入职工号."
          />
        </FormItem>
        <FormItem
          label="维修员姓名:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('wxryname')}
          />
        </FormItem>
        <FormItem
          label="维修房间号:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('roomid')}
          />
        </FormItem>
        <FormItem
          label="维修时间:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('wxsj')}
          />
        </FormItem>
        <FormItem
          label="维修物品:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('wxwp')}
          />
        </FormItem>
        <FormItem
          label="维修金额:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('wxje')}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
