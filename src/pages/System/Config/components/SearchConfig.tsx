import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const SearchConfig: React.FC = ({ onAddConfig, onSearchConfig, onResetSearchConfig }: any) => {
  const [form] = Form.useForm();

  const addConfig = () => {
    onAddConfig();
  };

  const SearchConfig = () => {
    onSearchConfig(form.getFieldsValue());
  };

  const resetSearchConfig = () => {
    form.resetFields()
    onResetSearchConfig();
  };
  return (
    <Form layout={'inline'} form={form}>
      <Form.Item label="参数键名" name={'configKey'}>
        <Input placeholder="参数键名" />
      </Form.Item>
      <Form.Item label="参数键值" name={'configValue'}>
        <Input placeholder="参数键值" />
      </Form.Item>
      <Form.Item label="系统内置" name={'configType'}>
        <Select
          defaultValue={2}
          style={{ width: 120 }}
          allowClear
          // onChange={(value) => setInterfaceStatus(value)}
          options={[
            { value: 0, label: '否' },
            { value: 1, label: '是' },
            { value: 2, label: '所有' },
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={SearchConfig}>
          搜索
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={resetSearchConfig}>
          重置
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={addConfig}>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchConfig;
