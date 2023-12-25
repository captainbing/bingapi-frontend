import React, { useState } from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import UpdateDictType from "@/pages/System/Dict/components/UpdateDictType";



const SearchDictType: React.FC = ({onSearchDictType,onResetDictType,addCancel}:any) => {
  const [form] = Form.useForm();
  /**
   * 搜索字典类型
   */
  const searchDictType = () => {
    onSearchDictType(form.getFieldsValue(true));
  };

  const resetDictType = () => {
    form.resetFields()
    onResetDictType();
  };

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  /**
   * 添加字典类型
   */
  const [addModalVisible, setAddModalVisible] = useState(false);
  const handleAddCancel = () => {
    setAddModalVisible(false);
    addCancel();
  };

  return (
    <>
      <Form layout={'inline'} form={form}>
        <Form.Item label="字典名称" name={'dictName'}>
          <Input placeholder="字典名称" />
        </Form.Item>
        <Form.Item label="字典类型" name={'dictType'}>
          <Input placeholder="字典类型" />
        </Form.Item>
        <Form.Item label="状态" name={'status'}>
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            allowClear
            // onChange={(value) => setInterfaceStatus(value)}
            options={[
              { value: 0, label: '可用' },
              { value: 1, label: '关闭' },
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" onClick={searchDictType}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" onClick={resetDictType}>
            重置
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" onClick={showAddModal}>
            添加
          </Button>
        </Form.Item>
      </Form>
      <UpdateDictType addModalVisible={addModalVisible} handleAddCancel={handleAddCancel} />
    </>
  );
};

export default SearchDictType;
