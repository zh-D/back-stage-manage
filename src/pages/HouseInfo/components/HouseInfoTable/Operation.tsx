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
        name: dataSource.name,
        roomid: dataSource.roomid,
        state: dataSource.state,
        phone: dataSource.phone,
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
            const { name, phone } = values
            if (!name) {
              Message.error("姓名不能为空！");
              return
            }
            if (!phone) {
              Message.error("电话不能为空！");
              return
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
          label="房主:"
          required
          requiredMessage="必填"
        >
          <Input
            {...field.init('name')}
            placeholder="请输入姓名."
          />
        </FormItem>
        <FormItem
          label="房间号(不可修改):"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('roomid')}
            value = {dataSource.roomid}
            style = {{backgroundColor:"#ababab"}}
          />
        </FormItem>
        <FormItem
          label="状态:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Select
            name="state"
            dataSource={[
              { value: '已购买', label: '已购买' },
              { value: '租客', label: '租客' },
            ]}
          />
        </FormItem>
        <FormItem
          label="手机号:"
          format="tel"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('phone')}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
