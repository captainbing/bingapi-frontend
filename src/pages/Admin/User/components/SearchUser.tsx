import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const SearchUser: React.FC = ({ getSearchUserList, resetUserList }: any) => {
  const [form] = Form.useForm();
  const searchInterfaceList = async () => {
    getSearchUserList(form.getFieldsValue());
  };
  const resetSearchInterfaceList = () => {
    form.resetFields();
    resetUserList();
  };

  return (
    <Form layout={'inline'} form={form}>
      <Form.Item label="名称" name={'userName'}>
        <Input placeholder="名称" />
      </Form.Item>
      <Form.Item label="状态" name={'userStatus'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          options={[
            { value: 0, label: '正常' },
            { value: 1, label: 'BAN' },
          ]}
        />
      </Form.Item>
      <Form.Item label="角色" name={'userRole'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          options={[
            { value: 'admin', label: 'admin' },
            { value: 'user', label: 'user' },
          ]}
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

export default SearchUser;
