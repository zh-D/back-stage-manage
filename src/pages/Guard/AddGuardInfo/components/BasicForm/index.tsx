import React, { useState, useEffect } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload, Field } from '@alifd/next';

import { useRequest } from 'ice';
import guardService from '../../../services/guard';

// import { UploadProps } from '@alifd/next/types/upload';
// import { Moment } from 'moment';

import styles from './index.module.scss';

const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  abryid?: string;
  abryname?: string;
  // date?: Moment[];
  ldh?: string;
  // pic?: UploadProps[];
  xlsj?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
};



const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const { request:addRequest } = useRequest(guardService.addGuardInfo)
  const DEFAULT_ON_SUBMIT = async (values: BasicFormProps, errors: []): void => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    addRequest(values);
    // document.getElementById("reset")?.click()
    setValue({abryid:'',abryname:'',ldh:'',xlsj:''})
    Message.success('提交成功');
  };
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
    onCancel = () => { },
  } = props;

  const [postData, setValue] = useState<BasicFormProps>(dataSource);

  const formChange = (values: BasicFormProps): void => {
    setValue(values);
  };

  return (
    <Card free>
      <Card.Content>
        <Form
          className={styles.BasicForm}
          responsive
          fullWidth
          value={postData}
          labelAlign="top"
          onChange={formChange}
        >
          <FormItem {...formItemLayout} label="保安职工号：" required requiredMessage="必填">
            <Input placeholder="请输入保安职工号" name="abryid" />
          </FormItem>

          <FormItem {...formItemLayout} label="保安姓名：" required requiredMessage="必填">
            <Input placeholder="请输入保安姓名" name="abryname" />
          </FormItem>

          <FormItem {...formItemLayout} label="ldh：" >
            <Input placeholder="请输入负责楼栋号" name="ldh" />
          </FormItem>

          <FormItem {...formItemLayout} label="巡逻时间：" >
            <Input placeholder="请输入巡逻时间" name="xlsj" />
          </FormItem>

          <FormItem colSpan={12}>
            <Box spacing={8} direction="row">
            
              <Form.Submit
                type="primary"
                onClick={onSubmit}
                validate
              >提交
              </Form.Submit>
              <Form.Reset id="reset" style={{display:"none"}}> 
              </Form.Reset>
              <Button onClick={onCancel} type="secondary">取消</Button>
            </Box>
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default BasicForm;
