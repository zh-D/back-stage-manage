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
        workid: dataSource.workid,
        workname: dataSource.workname,
        roomid: dataSource.roomid,
        sdf: dataSource.sdf,
        glf: dataSource.glf,
        ljf: dataSource.ljf,
        jfsj: dataSource.jfsj,
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
          label="物业人员职工号:"
          required
          requiredMessage="必填"
        >
          <Input
            {...field.init('workid')}
            placeholder="请输入物业人员职工号."
          />
        </FormItem>
        <FormItem
          label="物业人员姓名:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('workname')}
            placeholder='请输入物业人员姓名'
          />
        </FormItem>
        <FormItem
          label="房间:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('roomid')}
            placeholder='请输入房间号'
          />
        </FormItem>
        <FormItem
          label="水电费:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('sdf')}
          />
        </FormItem>
        <FormItem
          label="管理费:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('glf')}
          />
        </FormItem>
        <FormItem
          label="垃圾费:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('ljf')}
          />
        </FormItem>
        <FormItem
          label="交费时间:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('jfsj')}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
