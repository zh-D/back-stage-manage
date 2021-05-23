import React, { useState, useEffect } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload, Field } from '@alifd/next';

import { useRequest } from 'ice';
import greeningService from '../../../services/greening';

// import { UploadProps } from '@alifd/next/types/upload';
// import { Moment } from 'moment';

import styles from './index.module.scss';

const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  lhryid?: string;
  lhryname?: string;
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
  // state: '出租',
};



const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const { request: addRequest } = useRequest(greeningService.addGreeningInfo)
  const DEFAULT_ON_SUBMIT = async (values: BasicFormProps, errors: []): void => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    addRequest(values);
    // document.getElementById("reset")?.click()
    setValue({lhryid:'', lhryname:'', ldh:'', lhsj:''})
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
          <FormItem {...formItemLayout} label="绿化员职工号：" required requiredMessage="必填">
            <Input placeholder="请输入绿化员职工号" name="lhryid" />
          </FormItem>

          <FormItem {...formItemLayout} label="绿化员姓名：" required requiredMessage="必填">
            <Input placeholder="请输入绿化员姓名" name="lhryname" />
          </FormItem>

          <FormItem {...formItemLayout} label="负责楼栋：" >
            <Input placeholder="请输入楼栋号" name="ldh" />
          </FormItem>

          <FormItem {...formItemLayout} label="绿化时间：" >
            <Input placeholder="请输入绿化时间" name="lhsj" />
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
