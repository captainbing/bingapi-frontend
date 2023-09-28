import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const SearchJob: React.FC = ({ getSearchJobList, resetSearchJobList }: any) => {
  const [form] = Form.useForm();
  const resetJobList = () => {
    form.setFieldsValue({
      jobName: '',
      jobGroup: '',
      status: '',
    });
    resetSearchJobList();
  };
  return (
    <Form layout={'inline'} form={form}>
      <Form.Item label="任务名称" name={'jobName'}>
        <Input placeholder="任务名称" />
      </Form.Item>
      <Form.Item label="任务分组" name={'jobGroup'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          // onChange={(value) => setInterfaceStatus(value)}
          options={[
            { value: 'DEFAULT', label: 'DEFAULT' },
            { value: 'SYSTEM', label: 'SYSTEM' },
          ]}
        />
      </Form.Item>
      <Form.Item label="状态" name={'status'}>
        <Select
          placeholder={'请选择'}
          style={{ width: 120 }}
          allowClear
          // onChange={(value) => setInterfaceStatus(value)}
          options={[
            { value: 0, label: '正常' },
            { value: 1, label: '暂停' },
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={() => getSearchJobList(form.getFieldsValue())}>
          搜索
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={resetJobList}>
          重置
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary">添加</Button>
      </Form.Item>
    </Form>
  );
};

export default SearchJob;
