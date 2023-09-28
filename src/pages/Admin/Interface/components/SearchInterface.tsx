import React, { useState } from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';


const requestMethodOptions = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
  {
    value: 'OPTIONS',
    label: 'OPTIONS',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
];
const SearchInterface: React.FC = ({ getSearchInterfaceList, resetInterfaceList }: any) => {
  const [form] = Form.useForm();
  const searchInterfaceList = async () => {
    getSearchInterfaceList(form.getFieldsValue());
  };
  const resetSearchInterfaceList = () => {
    form.resetFields();
    resetInterfaceList();
  };

  return (
    <Form layout={'inline'} form={form}>
      <Form.Item label="名称" name={'name'}>
        <Input placeholder="名称" />
      </Form.Item>
      <Form.Item label="状态" name={'status'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          options={[
            { value: 0, label: '可用' },
            { value: 1, label: '关闭' },
          ]}
        />
      </Form.Item>
      <Form.Item label="方法" name={'method'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          options={requestMethodOptions}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={searchInterfaceList}>
          搜索
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={resetSearchInterfaceList}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchInterface;
