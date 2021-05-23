import React, { useState, useEffect } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload, Field } from '@alifd/next';

import { useRequest } from 'ice';
import payService from '../../../services/pay';

// import { UploadProps } from '@alifd/next/types/upload';
// import { Moment } from 'moment';

import styles from './index.module.scss';

const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  workid?: string;
  workname?: string;
  // date?: Moment[];
  roomid?: string;
  // pic?: UploadProps[];
  sdf?: string;
  glf?: string;
  ljf?: string;
  sfsj?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
};



const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const { request:addRequest } = useRequest(payService.addPayInfo)
  const DEFAULT_ON_SUBMIT = async (values: BasicFormProps, errors: []): void => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    addRequest(values);
    // document.getElementById("reset")?.click()
    setValue({workid:'',workname:'',roomid:'',sdf:'',glf:'',ljf:'',jfsj:''})
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
          <FormItem {...formItemLayout} label="物业人员职工号：" required requiredMessage="必填">
            <Input placeholder="请输入物业人员职工号" name="workid" />
          </FormItem>

          <FormItem {...formItemLayout} label="物业人员姓名：" required requiredMessage="必填">
            <Input placeholder="请输入物业人员姓名" name="workname" />
          </FormItem>

          <FormItem {...formItemLayout} label="房间：" >
          <Input placeholder="请输入房间号" name="roomid" />
          </FormItem>

          <FormItem {...formItemLayout} label="水电费：" >
            <Input placeholder="请输入水电费" name="sdf" />
          </FormItem>

          <FormItem {...formItemLayout} label="管理费：" >
            <Input placeholder="请输入管理费" name="glf" />
          </FormItem>

          <FormItem {...formItemLayout} label="垃圾费：" >
            <Input placeholder="请输入垃圾费" name="ljf" />
          </FormItem>

          <FormItem {...formItemLayout} label="交费时间：" >
            <Input placeholder="请输入交费时间" name="jfsj" />
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
