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
        abryid: dataSource.abryid,
        abryname: dataSource.abryname,
        ldh: dataSource.ldh,
        xlsj: dataSource.xlsj,
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
                return;
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
          label="保安职工号:"
          required
          requiredMessage="必填"
        >
          <Input
            {...field.init('abryid')}
            placeholder="请输入保安职工号."
          />
        </FormItem>
        <FormItem
          label="保安姓名:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('abryname')}
            placeholder="请输入保安姓名."
          />
        </FormItem>
        <FormItem
          label="负责楼栋:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('ldh')}
            placeholder="去输入楼栋号."
          />
        </FormItem>
        <FormItem
          label="巡逻时间:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('xlsj')}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
