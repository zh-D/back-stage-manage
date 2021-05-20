import React, { useState, useEffect } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload } from '@alifd/next';

import { useRequest } from 'ice';
import houseService from '../../../services/houseInfo';

// import { UploadProps } from '@alifd/next/types/upload';
// import { Moment } from 'moment';

import styles from './index.module.scss';

const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  name?: string;
  roomid?: string;
  // date?: Moment[];
  status?: string;
  // pic?: UploadProps[];
  phone?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  status: '出租',
};



const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const { request:addRequest } = useRequest(houseService.addHouseInfo)
  const DEFAULT_ON_SUBMIT = async (values: BasicFormProps, errors: []): void => {
    addRequest(values)
    document.getElementById("reset")?.click()
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
          <FormItem {...formItemLayout} label="房主名称：" required requiredMessage="必填">
            <Input placeholder="请输入房主名称" name="name" />
          </FormItem>

          <FormItem {...formItemLayout} label="房间号：" required requiredMessage="必填">
            <Input placeholder="请输入房间号" name="roomid" />
          </FormItem>

          <FormItem {...formItemLayout} label="状态：" >
            <Radio.Group name="status" aria-labelledby="authority of project">
              <Radio id="private" value="出租">出租</Radio>
              <Radio id="internal" value="业主">业主</Radio>
            </Radio.Group>
          </FormItem>

          <FormItem {...formItemLayout} label="手机号：" >
            <Input placeholder="请输入手机号" name="phone" />
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
